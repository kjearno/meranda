import React, { useRef, useState, useEffect } from "react";
import { useProfile } from "../../../hooks";

import { FormButton, FormGroup } from "@ui/components";
import { DisplayPhoto } from "./DisplayPhoto";
import styles from "./Photo.module.scss";

export const Photo = () => {
  const { isLoading, error, user, onPhotoUpdate } = useProfile();
  const [fileSelected, setFileSelected] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!error && !isLoading) {
      setFileSelected(false);
      fileInput.current.value = null;
    }
  }, [error, isLoading]);

  const handleInputChange = () => {
    const fileInputLength = fileInput.current.files.length;
    fileInputLength ? setFileSelected(true) : setFileSelected(false);
  };

  return (
    <form className={styles.form} onSubmit={onPhotoUpdate}>
      <FormGroup>
        <DisplayPhoto src={user.photo} />
      </FormGroup>
      <FormGroup>
        <input
          type="file"
          name="photo"
          ref={fileInput}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormButton disabled={!fileSelected} loading={isLoading}>
        Save
      </FormButton>
    </form>
  );
};

import React, { useEffect, useRef, useState } from "react";

import { FormButton, FormGroup } from "@shared/components";
import { useProfile } from "../../hooks";
import { ViewBox } from "./ViewBox";
import styles from "./Photo.module.scss";

export function Photo() {
  const { user, isLoading, error, onPhotoUpdate } = useProfile();
  const [fileSelected, setFileSelected] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!isLoading && !error) {
      setFileSelected(false);
      fileInput.current.value = null;
    }
  }, [isLoading, error]);

  const handleInputChange = () => {
    setFileSelected(!!fileInput.current.files.length);
  };

  return (
    <form className={styles.form} onSubmit={onPhotoUpdate}>
      <FormGroup>
        <ViewBox src={user.photo} />
      </FormGroup>
      <FormGroup>
        <input
          className={styles.input}
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
}

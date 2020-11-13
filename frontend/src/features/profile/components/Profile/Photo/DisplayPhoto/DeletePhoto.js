import React, { useState, useRef } from "react";
import { useProfile } from "../../../../hooks";

import { Button, Card, ClickAwayListener, Popper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./DeletePhoto.module.scss";

export const DeletePhoto = () => {
  const [open, setOpen] = useState(false);
  const anchor = useRef(null);
  const { onPhotoDelete } = useProfile();

  const handleDeleteClick = event => {
    event.preventDefault();
    setOpen(prevValue => !prevValue);
  };

  const handleClose = event => {
    if (anchor.current && anchor.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <button
        className={styles.deleteButton}
        ref={anchor}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </button>

      <ClickAwayListener onClickAway={handleClose}>
        <Popper open={open} anchorEl={anchor.current}>
          <Card className={styles.window}>
            <p>Are you sure you want to delete the photo?</p>
            <div>
              <Button size="small" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button size="small" color="primary" onClick={onPhotoDelete}>
                Confirm
              </Button>
            </div>
          </Card>
        </Popper>
      </ClickAwayListener>
    </>
  );
};

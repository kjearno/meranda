import React from "react";
import PropTypes from "prop-types";
import { NoUserPhoto } from "@shared/assets";
import styles from "./style.module.scss";

export function AuthorPhoto({ photo }) {
  return (
    <div className={styles.authorPhoto}>
      <img src={photo || NoUserPhoto} alt="" />
    </div>
  );
}

AuthorPhoto.propTypes = {
  photo: PropTypes.string,
};

AuthorPhoto.defaultProps = {
  photo: null,
};

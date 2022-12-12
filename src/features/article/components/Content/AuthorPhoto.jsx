import PropTypes from "prop-types";
import React from "react";

import { noUserPhoto } from "@assets";
import styles from "./AuthorPhoto.module.scss";

export function AuthorPhoto({ photo }) {
  return (
    <div className={styles.authorPhoto}>
      <img src={photo || noUserPhoto} alt="" />
    </div>
  );
}

AuthorPhoto.propTypes = {
  photo: PropTypes.string,
};

AuthorPhoto.defaultProps = {
  photo: null,
};

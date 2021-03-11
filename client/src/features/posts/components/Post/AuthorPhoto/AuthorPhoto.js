import React from "react";
import { NoUserPhoto } from "@ui/assets";
import styles from "./AuthorPhoto.module.scss";

export const AuthorPhoto = ({ src }) => {
  const photo = src ? src : NoUserPhoto;

  return (
    <div className={styles.box}>
      <img src={photo} alt="" />
    </div>
  );
};

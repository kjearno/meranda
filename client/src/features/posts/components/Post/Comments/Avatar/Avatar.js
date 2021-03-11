import React from "react";
import { NoUserPhoto } from "@ui/assets";
import styles from "./Avatar.module.scss";

export const Avatar = ({ src }) => {
  const photo = src ? src : NoUserPhoto;

  return (
    <div className={styles.avatar}>
      <img src={photo} alt="" />
    </div>
  );
};

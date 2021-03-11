import React from "react";
import { FormLoadingIcon, PointLoadingIcon } from "../../../assets";
import styles from "./Button.module.scss";

export const Button = ({ loading, children, ...props }) => (
  <button className={styles.textButton} disabled={loading} {...props}>
    <div>
      {loading && <img src={FormLoadingIcon} alt="" />}
      <span>{children}</span>
    </div>
  </button>
);

export const IconButton = ({ icon, loading, ...props }) => (
  <button className={styles.iconButton} disabled={loading} {...props}>
    <img src={loading ? PointLoadingIcon : icon} alt="" />
  </button>
);

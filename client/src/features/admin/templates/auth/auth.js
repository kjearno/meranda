import React from "react";
import styles from "./auth.module.scss";

export const AdminAuthTemplate = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>{children}</div>
  </div>
);

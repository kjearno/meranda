import React from "react";
import styles from "./SectionTitle.module.scss";

export const SectionTitle = ({ caption, children, ...props }) => (
  <div className={styles.box} {...props}>
    {caption && <div className={styles.caption}>{caption}</div>}
    <h2 className={styles.text}>{children}</h2>
  </div>
);

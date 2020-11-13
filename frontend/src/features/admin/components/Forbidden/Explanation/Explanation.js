import React from "react";
import styles from "./Explanation.module.scss";

export const Explanation = () => (
  <div className={styles.explanation}>
    <p>It looks like you do not have sufficient rights to view this page.</p>
    <p>
      You can go back home or log in with an account with sufficient rights.
    </p>
  </div>
);

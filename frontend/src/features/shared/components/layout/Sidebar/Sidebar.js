import React from "react";
import { LastComments } from "@features/comments";
import styles from "./Sidebar.module.scss";

export const Sidebar = () => (
  <div className={styles.sidebar}>
    <LastComments />
  </div>
);

import React from "react";
import { LastComments } from "@features/lastComments";
import styles from "./Sidebar.module.scss";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <LastComments />
    </aside>
  );
}

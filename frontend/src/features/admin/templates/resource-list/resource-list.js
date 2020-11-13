import React from "react";
import { AdminTemplate } from "../../templates";
import styles from "./resource-list.module.scss";

export const AdminListTemplate = ({ children }) => (
  <AdminTemplate>
    <div className={styles.wrapper}>{children}</div>
  </AdminTemplate>
);

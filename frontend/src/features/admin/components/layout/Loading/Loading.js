import React from "react";
import { Spin } from "antd";
import styles from "./Loading.module.scss";

export const Loading = () => (
  <div className={styles.loading}>
    <Spin />
  </div>
);

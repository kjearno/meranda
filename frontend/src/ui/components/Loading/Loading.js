import React from "react";
import { SectionLoadingIcon } from "../../assets";
import styles from "./Loading.module.scss";

export const Loading = () => (
  <div className={styles.loader}>
    <img src={SectionLoadingIcon} alt="" />
  </div>
);

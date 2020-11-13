import React from "react";
import { AdminLogoIcon } from "@ui/assets";
import styles from "./Logo.module.scss";

export const Logo = () => (
  <div className={styles.logo}>
    <img src={AdminLogoIcon} alt="" />
    <span>Ant Design</span>
  </div>
);

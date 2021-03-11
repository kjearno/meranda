import React from "react";
import { Link } from "react-router-dom";
import { AdminLogoIcon } from "@ui/assets";
import styles from "./Logo.module.scss";

export const Logo = ({ collapsed }) => (
  <div className={styles.logo}>
    <Link to="/admin">
      <img src={AdminLogoIcon} alt="" />
      {collapsed ? "" : <span>Ant Design</span>}
    </Link>
  </div>
);

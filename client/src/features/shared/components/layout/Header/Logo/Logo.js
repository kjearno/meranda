import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

export const Logo = () => (
  <Link className={styles.logo} to="/">
    Meranda
  </Link>
);

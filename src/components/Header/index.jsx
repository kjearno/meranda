import React from "react";
import { Grid } from "react-flexbox-grid";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Grid>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            Meranda
          </Link>
        </div>
      </Grid>
    </header>
  );
}

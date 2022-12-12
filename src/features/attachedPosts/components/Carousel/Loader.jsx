import { Skeleton } from "@material-ui/lab";
import React from "react";

import styles from "./Slide.module.scss";

export function Loader() {
  return (
    <article className={styles.slide}>
      <div className={styles.photo}>
        <Skeleton variant="rect" height="100%" />
      </div>

      <div className={styles.content}>
        <div className={styles.caption}>
          <Skeleton width="25%" />
        </div>
        <h5 className={styles.title}>
          <Skeleton />
        </h5>
        <p className={styles.description}>
          <Skeleton />
          <Skeleton />
          <Skeleton width="15%" />
        </p>
        <div className={styles.meta}>
          <p className={styles.info}>
            <Skeleton width="20%" />
          </p>
          <span className={styles.date}>
            <Skeleton width="15%" />
          </span>
        </div>
      </div>
    </article>
  );
}

import { Skeleton } from "@material-ui/lab";
import React from "react";

import styles from "./Post.module.scss";

export function Loader({ n }) {
  return [...Array(n).keys()].map((key) => (
    <article className={styles.post} key={key}>
      <div className={styles.photo}>
        <Skeleton variant="rect" height="100%" />
      </div>

      <div className={styles.content}>
        <h5 className={styles.title}>
          <Skeleton width="40%" />
        </h5>
        <p className={styles.description}>
          <Skeleton />
          <Skeleton width="60%" />
        </p>
        <div className={styles.meta}>
          <p className={styles.info}>
            <span>
              <Skeleton width="20%" />
            </span>
          </p>
          <p className={styles.date}>
            <Skeleton width="15%" />
          </p>
        </div>
      </div>
    </article>
  ));
}

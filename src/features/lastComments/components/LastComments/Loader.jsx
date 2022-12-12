import { Skeleton } from "@material-ui/lab";
import React from "react";

import styles from "./Comment.module.scss";

export function Loader({ n }) {
  return [...Array(n).keys()].map((key) => (
    <div className={styles.comment} key={key}>
      <div className={styles.number}>
        <Skeleton width="16px" />
      </div>

      <div className={styles.body}>
        <p className={styles.text}>
          <Skeleton />
        </p>
        <div className={styles.meta}>
          <p className={styles.author}>
            <Skeleton />
          </p>
          <p>
            <Skeleton width="40%" />
          </p>
        </div>
      </div>
    </div>
  ));
}

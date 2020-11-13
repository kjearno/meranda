import React from "react";

import { Skeleton } from "@material-ui/lab";
import styles from "./PostItem.module.scss";

export const Loading = ({ n }) =>
  [...new Array(n)].map((item, index) => (
    <article className={styles.box} key={index}>
      <div className={styles.thumbnail}>
        <Skeleton variant="rect" height="100%" />
      </div>

      <section className={styles.content}>
        <header>
          <h2 className={styles.title}>
            <Skeleton width="40%" />
          </h2>
        </header>

        <p className={styles.description}>
          <Skeleton />
          <Skeleton width="60%" />
        </p>

        <footer>
          <div className={styles.meta}>
            <Skeleton width="20%" />
          </div>
        </footer>
      </section>
    </article>
  ));

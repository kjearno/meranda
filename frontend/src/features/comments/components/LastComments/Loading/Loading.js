import React from "react";

import { Skeleton } from "@material-ui/lab";
import styles from "./Loading.module.scss";

export const Loading = () =>
  [...new Array(5)].map((item, index) => (
    <div className={styles.entry} key={index}>
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  ));

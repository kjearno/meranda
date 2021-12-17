import { ListItem } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./Menu.module.scss";

export function Loader({ n }) {
  return [...Array(n).keys()].map((key) => (
    <ListItem className={styles.item} key={key}>
      <Link to="/" aria-current="page">
        <Skeleton width="50px" />
      </Link>
    </ListItem>
  ));
}

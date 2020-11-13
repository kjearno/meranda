import React from "react";
import { Paper as MuiPaper } from "@material-ui/core";
import styles from "./Paper.module.scss";

export const Paper = props => <MuiPaper className={styles.paper} {...props} />;

import { Paper as MuiPaper } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import styles from "./Paper.module.scss";

export function Paper({ children }) {
  return <MuiPaper className={styles.paper}>{children}</MuiPaper>;
}

Paper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])),
  ]).isRequired,
};

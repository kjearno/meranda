import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

export function FormGroup({ children }) {
  return <div className={styles.formGroup}>{children}</div>;
}

FormGroup.propTypes = {
  children: PropTypes.element.isRequired,
};

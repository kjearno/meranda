import PropTypes from "prop-types";
import React from "react";
import styles from "./FormGroup.module.scss";

export function FormGroup({ children }) {
  return <div className={styles.formGroup}>{children}</div>;
}

FormGroup.propTypes = {
  children: PropTypes.element.isRequired,
};

import PropTypes from "prop-types";
import React from "react";

import { Spinner } from "@assets";
import styles from "./Loader.module.scss";

export function Loader({ size }) {
  return (
    <div className={styles.loader}>
      <Spinner style={{ width: size, height: size }} />
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: 50,
};

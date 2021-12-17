import PropTypes from "prop-types";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

import styles from "./Loader.module.scss";

export function Loader({ size }) {
  return (
    <div className={styles.loader}>
      <MoonLoader size={size} />
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: 50,
};

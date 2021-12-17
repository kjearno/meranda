import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

export function IconButton({ icon, loading }) {
  return (
    <button
      className={cx("button", "iconButton")}
      disabled={loading}
      type="submit"
    >
      {loading ? <PulseLoader color="#fff" size={6} /> : icon}
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
};

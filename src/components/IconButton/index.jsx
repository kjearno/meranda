import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";

import styles from "./IconButton.module.scss";

const cx = classNames.bind(styles);

export function IconButton({ icon, loading }) {
  return (
    <button
      className={cx("button", "iconButton", { loading })}
      disabled={loading}
      type="submit"
    >
      {icon}
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
};

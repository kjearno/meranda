import { css } from "@emotion/core";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import styles from "./Button.module.scss";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  line-height: 1;
  transform: translate(-50%, -50%);
`;

const cx = classNames.bind(styles);

export function Button({ children, loading }) {
  return (
    <button
      className={cx("button", "textButton", { loading })}
      disabled={loading}
      type="submit"
    >
      <span className={cx("children", { hidden: loading })}>{children}</span>
      {loading && <PulseLoader css={override} color="#fff" size={6} />}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

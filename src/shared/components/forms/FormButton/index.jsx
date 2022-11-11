import { css } from "@emotion/core";
import { Button } from "@material-ui/core";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import styles from "./FormButton.module.scss";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const cx = classNames.bind(styles);

export function FormButton({ children, disabled, loading }) {
  return (
    <Button
      className={styles.button}
      color="primary"
      disabled={disabled || loading}
      type="submit"
      variant="contained"
    >
      <span className={cx({ hidden: loading })}>{children}</span>
      {loading && <PulseLoader css={override} color="#919191" size={6} />}
    </Button>
  );
}

FormButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

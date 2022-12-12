import { Skeleton } from "@material-ui/lab";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";

import styles from "./SectionTitle.module.scss";

const cx = classNames.bind(styles);

export function SectionTitle({ caption, children, loading }) {
  return (
    <div className={styles.sectionTitle}>
      {caption && <p className={styles.caption}>{caption}</p>}

      <h2 className={cx("text", { loading })}>
        {loading ? <Skeleton width="80px" /> : children}
      </h2>
    </div>
  );
}

SectionTitle.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  ]),
  loading: PropTypes.bool,
};

SectionTitle.defaultProps = {
  caption: "",
  children: null,
  loading: false,
};

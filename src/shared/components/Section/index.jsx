import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";

import { SectionTitle } from "./SectionTitle";
import styles from "./Section.module.scss";

const cx = classNames.bind(styles);

export function Section({ children, className, painted }) {
  return (
    <section className={cx("section", className, { painted })}>
      {children}
    </section>
  );
}

Section.Title = SectionTitle;

Section.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  painted: PropTypes.bool,
};

Section.defaultProps = {
  className: "",
  painted: false,
};

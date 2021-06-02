import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { SectionTitle } from "./SectionTitle";
import styles from "./style.module.scss";

const cx = classNames.bind(styles);

export function Section({ className, painted, children }) {
  return (
    <section className={cx("section", className, { painted })}>
      {children}
    </section>
  );
}

Section.Title = SectionTitle;

Section.propTypes = {
  className: PropTypes.string,
  painted: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Section.defaultProps = {
  className: "",
  painted: false,
};

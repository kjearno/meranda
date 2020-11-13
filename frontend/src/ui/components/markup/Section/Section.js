import React from "react";
import classNames from "classnames/bind";
import styles from "./Section.module.scss";

const cx = classNames.bind(styles);

export const Section = ({ painted, ...props }) => {
  const className = cx({
    wrapper: true,
    painted
  });

  return <div className={className} {...props} />;
};

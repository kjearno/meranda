import { Divider, List } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Content } from "./Content";
import { Userbar } from "./Userbar";
import styles from "./Menu.module.scss";

export function Menu({ onClick }) {
  return (
    <List className={styles.list} onClick={onClick}>
      <Content />
      <Divider />
      <Userbar />
    </List>
  );
}

Menu.propTypes = {
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  onClick: () => {},
};

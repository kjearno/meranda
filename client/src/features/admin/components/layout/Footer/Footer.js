import React from "react";
import { Layout } from "antd";
import styles from "./Footer.module.scss";

const { Footer: AntFooter } = Layout;

export const Footer = () => (
  <AntFooter className={styles.footer}>Ant Design © 2020</AntFooter>
);

import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useSidebar } from "../../../../hooks";
import styles from "./SiderTrigger.module.scss";

export const SiderTrigger = () => {
  const { collapsed, onToggleSidebar } = useSidebar();

  return React.createElement(
    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    {
      className: styles.trigger,
      onClick: onToggleSidebar
    }
  );
};

import React, { useContext } from "react";
import { Layout } from "antd";
import { useSidebar } from "@features/admin";
import { DeviceContext } from "@features/shared";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

const { Sider } = Layout;

export const Sidebar = () => {
  const { collapsed } = useSidebar();
  const isMobile = useContext(DeviceContext);

  const siderProps = {
    collapsed,
    collapsedWidth: isMobile ? 0 : 80,
    width: isMobile ? 80 : 200
  };

  return (
    <Sider {...siderProps}>
      <Logo collapsed={collapsed || isMobile} />
      <Menu />
    </Sider>
  );
};

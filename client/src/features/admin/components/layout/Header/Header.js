import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  DownOutlined,
  PoweroffOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useAuth } from "@features/auth";
import { SiderTrigger } from "./SiderTrigger";
import styles from "./Header.module.scss";

const { Header: AntHeader } = Layout;

export const Header = () => {
  const { user, onLogout } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item onClick={onLogout}>
        <PoweroffOutlined />
        <span>Exit</span>
      </Menu.Item>
    </Menu>
  );

  const avatar = user.photo ? user.photo : null;

  return (
    <AntHeader className={`site-layout-background ${styles.header}`}>
      <SiderTrigger />
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className={styles.profile}>
          <Avatar
            className={styles.avatar}
            icon={<UserOutlined />}
            src={avatar}
            size={40}
          />
          <span className={styles.username}>{user.username}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </AntHeader>
  );
};

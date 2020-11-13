import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as AntMenu } from "antd";
import {
  HomeOutlined,
  GroupOutlined,
  ReadOutlined,
  CommentOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import styles from "./Menu.module.scss";

const items = [
  { path: "/admin", icon: <HomeOutlined />, title: "Dashboard" },
  { path: "/admin/categories", icon: <GroupOutlined />, title: "Categories" },
  { path: "/admin/posts", icon: <ReadOutlined />, title: "Posts" },
  { path: "/admin/comments", icon: <CommentOutlined />, title: "Comments" },
  { path: "/admin/users", icon: <UserOutlined />, title: "Users" },
  {
    path: "/admin/subscribers",
    icon: <UsergroupAddOutlined />,
    title: "Subscribers"
  }
];

export const Menu = props => {
  const location = useLocation();
  const key = location.pathname.split("/").splice(0, 3).join("/");

  return (
    <AntMenu theme="dark" selectedKeys={[key]} {...props}>
      {items.map(({ path, icon, title }) => (
        <AntMenu.Item key={path} icon={icon} className={styles.menu}>
          <Link to={path}>{title}</Link>
        </AntMenu.Item>
      ))}
    </AntMenu>
  );
};

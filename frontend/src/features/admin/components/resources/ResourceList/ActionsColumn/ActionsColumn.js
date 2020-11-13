import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Dropdown, Popconfirm } from "antd";
import {
  DownOutlined,
  BarsOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { history } from "@lib/routing";
import styles from "./ActionsColumn.module.scss";

export const ActionsColumn = ({ record, onItemDelete, ...props }) => {
  const [visible, setVisible] = useState(false);
  const { pathname, search } = history.location;

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const actions = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`${pathname}/${record.id}/edit`}>Edit</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="Are you sure delete this?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okText="Yes"
          cancelText="No"
          onConfirm={() => onItemDelete(record.id)}
        >
          <Link to={{ pathname, search }}>Delete</Link>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={actions}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      {...props}
    >
      <Button className={styles.button}>
        <BarsOutlined />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks";
import { Logo } from "./Logo";
import styles from "./Login.module.scss";

export const Login = () => {
  const { isLoading, onLogin } = useAuth();

  return (
    <div className={styles.login}>
      <Logo />

      <Form initialValues={{ remember: true }} onFinish={onLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

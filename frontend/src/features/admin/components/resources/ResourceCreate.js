import React from "react";
import { Form, Button } from "antd";
import { useResourceCreate } from "../../hooks";
import { NotFound } from "../errors/NotFound";
import { layout, tailLayout } from "./layout";

export const ResourceCreate = () => {
  const {
    inputs,
    creating,
    isValuesTouched,
    onValuesChange,
    onCreate
  } = useResourceCreate();

  if (!inputs) {
    return <NotFound />;
  }

  return (
    <Form onValuesChange={onValuesChange} onFinish={onCreate}>
      {inputs.map(({ children, name, ...rest }) => (
        <Form.Item key={name} name={name} {...rest} {...layout}>
          {children}
        </Form.Item>
      ))}

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValuesTouched}
          loading={creating}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

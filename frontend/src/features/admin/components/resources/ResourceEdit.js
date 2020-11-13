import React from "react";
import { Form, Button, Spin } from "antd";
import { Error } from "../errors";
import { useResourceEdit } from "../../hooks";
import { NotFound } from "../errors/NotFound";
import { layout, tailLayout } from "./layout";

export const ResourceEdit = () => {
  const {
    error,
    loading,
    editing,
    inputs,
    form,
    isValuesTouched,
    onValuesChange,
    onEdit
  } = useResourceEdit();

  if (!inputs) {
    return <NotFound />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        onValuesChange={onValuesChange}
        onFinish={onEdit}
      >
        {inputs.map(({ children, name, ...rest }) => (
          <Form.Item key={name} name={name} {...rest}>
            {children}
          </Form.Item>
        ))}

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValuesTouched}
            loading={editing}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

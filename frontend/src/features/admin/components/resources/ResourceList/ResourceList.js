import React from "react";
import { Table } from "antd";
import { NotFound } from "../../../components";
import { useResourceList } from "../../../hooks";
import { Actions } from "./Actions";

export const ResourceList = () => {
  const {
    columns,
    items,
    pagination,
    isLoading,
    rowSelection,
    onChange
  } = useResourceList();

  if (!columns) {
    return <NotFound />;
  }

  return (
    <>
      <Actions />
      <Table
        columns={columns}
        dataSource={items}
        loading={isLoading}
        pagination={pagination}
        rowKey={record => record.id}
        rowSelection={rowSelection}
        scroll={{ x: true }}
        onChange={onChange}
      />
    </>
  );
};

import React from "react";
import { ActionsColumn } from "../../../components";

export const rawColumns = {
  categories: [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Name",
      dataIndex: "name"
    }
  ],

  posts: [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Category",
      dataIndex: ["category", "name"]
    }
  ],

  comments: [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "User",
      dataIndex: ["user", "username"]
    },
    {
      title: "Post",
      dataIndex: ["post", "title"]
    }
  ],

  users: [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Username",
      dataIndex: "username"
    }
  ],

  subscribers: [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Email",
      dataIndex: "email"
    }
  ]
};

export const getColumns = ({ resourceName, onItemDelete }) => {
  const actionsColumn = {
    title: "Actions",
    key: "actions",
    fixed: "right",
    render: (text, record) => (
      <ActionsColumn record={record} onItemDelete={onItemDelete} />
    )
  };

  if (rawColumns[resourceName]) {
    return [...rawColumns[resourceName], actionsColumn];
  }
};

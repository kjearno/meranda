import React from "react";
import { Input, Select, Switch } from "antd";
import { UploadFile } from "../../../components";

const { TextArea } = Input;

export const getInputs = ({ relations }) => ({
  categories: [
    {
      label: "Id",
      name: "id",
      children: <Input disabled />
    },
    {
      label: "Name",
      name: "name",
      rules: [
        {
          required: true,
          message: "Fill this field"
        }
      ],
      children: <Input />
    },
    {
      label: "Slug",
      name: "slug",
      children: <Input disabled />
    }
  ],

  comments: [
    {
      label: "Id",
      name: "id",
      children: <Input disabled />
    },
    {
      label: "Text",
      name: "text",
      rules: [
        {
          required: true,
          message: "Fill this field"
        }
      ],
      children: <TextArea rows={4} />
    },
    {
      label: "User",
      name: ["user", "username"],
      children: <Select disabled />
    },
    {
      label: "Post",
      name: ["post", "title"],
      children: <Select disabled />
    }
  ],

  posts: [
    {
      label: "Id",
      name: "id",
      children: <Input disabled />
    },
    {
      label: "Title",
      name: "title",
      rules: [
        {
          required: true,
          message: "Fill this field"
        }
      ],
      children: <Input />
    },
    {
      label: "Slug",
      name: "slug",
      children: <Input disabled />
    },
    {
      label: "Text",
      name: "text",
      rules: [
        {
          required: true,
          message: "Fill this field"
        }
      ],
      children: <TextArea rows={4} />
    },
    {
      label: "Description",
      name: "description",
      children: <TextArea disabled rows={4} />
    },
    {
      label: "Photo",
      name: "photo",
      children: <UploadFile />
    },
    {
      label: "Attached",
      name: "isAttached",
      valuePropName: "checked",
      children: <Switch />
    },
    {
      label: "User",
      name: ["user", "username"],
      children: <Input disabled />
    },
    {
      label: "Category",
      name: "categoryId",
      rules: [
        {
          required: true,
          message: "Select option"
        }
      ],
      children: (
        <Select
          disabled={relations.categories?.loading}
          loading={relations.categories?.loading}
          options={relations.categories?.data}
          placeholder="Please select"
        />
      )
    }
  ],

  subscribers: [
    {
      label: "Id",
      name: "id",
      children: <Input disabled />
    },
    {
      label: "Email",
      name: "email",
      children: <Input disabled />
    }
  ],

  users: [
    {
      label: "Id",
      name: "id",
      children: <Input disabled />
    },
    {
      label: "Email",
      name: "email",
      children: <Input disabled />
    },
    {
      label: "Username",
      name: "username",
      rules: [
        {
          required: true,
          message: "Fill this field"
        }
      ],
      children: <Input />
    },
    {
      label: "Photo",
      name: "photo",
      children: <UploadFile />
    },
    {
      label: "Active",
      name: "isActive",
      valuePropName: "checked",
      children: <Switch />
    },
    {
      label: "Admin",
      name: "isAdmin",
      valuePropName: "checked",
      children: <Switch />
    },
    {
      label: "Role",
      name: "roleId",
      children: (
        <Select
          disabled={relations.roles?.loading}
          loading={relations.roles?.loading}
          options={relations.roles?.data}
          placeholder="Please select"
        />
      )
    }
  ]
});

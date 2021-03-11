import React from "react";
import { Input, Select, Switch } from "antd";
import { UploadFile } from "../../../components";

const { TextArea } = Input;

export const getInputs = ({ relations }) => ({
  categories: [
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
    }
  ],

  posts: [
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
    },
    {
      label: "Photo",
      name: "photo",
      children: <UploadFile />
    },
    {
      label: "Attached",
      name: "isAttached",
      children: <Switch />
    }
  ]
});

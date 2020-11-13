import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const UploadFile = ({ value, onChange, ...props }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (typeof value === "string") {
      setFileList([
        {
          uid: "-1",
          status: "done",
          url: value
        }
      ]);
    }
  }, [value]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = ({ file, fileList: newFileList }) => {
    if (onChange) {
      setFileList(newFileList);
      onChange(file);
    }
  };

  return (
    <Upload
      {...props}
      listType="picture-card"
      fileList={fileList}
      showUploadList={{ showPreviewIcon: false }}
      onChange={handleChange}
      beforeUpload={() => false}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );
};

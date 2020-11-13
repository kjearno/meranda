import React from "react";
import { Helmet } from "react-helmet";
import { Result } from "antd";

export const CommonError = ({ message }) => (
  <>
    <Helmet title="Error" />
    <Result status="error" title="Error" subTitle={message} />
  </>
);

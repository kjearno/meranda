import React from "react";
import { Helmet } from "react-helmet";
import { Result, Button } from "antd";
import { history } from "@lib/routing";

export const AdminNoMatchPage = () => (
  <>
    <Helmet title="404 Error" />

    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/admin")}>
          Back Home
        </Button>
      }
    />
  </>
);

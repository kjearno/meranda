import React from "react";
import { Result, Button } from "antd";
import { useAuth } from "@features/auth";
import { history } from "@lib/routing";
import { Explanation } from "./Explanation";

export const Forbidden = () => {
  const { onLogout } = useAuth();

  return (
    <Result
      status="403"
      title="403"
      subTitle={<Explanation />}
      extra={
        <>
          <Button onClick={() => history.push("/")}>Back Home</Button>
          <Button onClick={onLogout}>Switch Account</Button>
        </>
      }
    />
  );
};

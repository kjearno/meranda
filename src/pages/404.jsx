import React from "react";
import { Helmet } from "react-helmet";

import { NotFoundError } from "@components/errors";
import { CommonTemplate } from "@components/templates";

export default function NotFound() {
  return (
    <CommonTemplate>
      <Helmet title="Not Found" />

      <NotFoundError />
    </CommonTemplate>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import { NotFoundError } from "@shared/components";
import { CommonTemplate } from "@shared/templates";

export default function NotFound() {
  return (
    <CommonTemplate>
      <Helmet title="Not Found" />

      <NotFoundError />
    </CommonTemplate>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import { NotFound } from "@shared/components";
import { CommonTemplate } from "@shared/templates";

export function NotFoundPage() {
  return (
    <CommonTemplate>
      <Helmet title="Not Found" />

      <NotFound />
    </CommonTemplate>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import { Content, useCategoryData } from "@features/category";
import { CommonTemplate } from "@shared/templates";

export default function Category() {
  const category = useCategoryData();

  return (
    <CommonTemplate>
      <Helmet title={category?.name} />

      <Content />
    </CommonTemplate>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import { Category, useCategoryData } from "@features/category";
import { CommonTemplate } from "@shared/templates";

export function CategoryPage() {
  const category = useCategoryData();

  return (
    <CommonTemplate>
      <Helmet title={category?.name} />

      <Category />
    </CommonTemplate>
  );
}

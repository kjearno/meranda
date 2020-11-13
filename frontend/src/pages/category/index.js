import React from "react";
import { Helmet } from "react-helmet";
import { useCategory, CategoryTemplate, Category } from "@features/categories";

export const CategoryPage = () => {
  const { category } = useCategory();

  return (
    <>
      <Helmet title={category.name} />

      <CategoryTemplate>
        <Category />
      </CategoryTemplate>
    </>
  );
};

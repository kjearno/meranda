import React from "react";
import { Element } from "react-scroll";

import { Error, Section } from "@shared/components";
import { useCategory } from "../../hooks";
import { Page } from "./Page";

export function Content() {
  const { category, isLoading, error } = useCategory();

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Element name="categoryContent" />

      <Section.Title caption="Category" loading={isLoading}>
        {category?.name}
      </Section.Title>

      <Page />
    </>
  );
}

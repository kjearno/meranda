import React from "react";
import { Helmet } from "react-helmet";

import { ArticleTemplate, Content, useArticleData } from "@features/article";

export default function Article() {
  const article = useArticleData();

  return (
    <ArticleTemplate>
      <Helmet title={article?.title} />

      <Content />
    </ArticleTemplate>
  );
}

import React from "react";
import { Helmet } from "react-helmet";
import { Article, ArticleTemplate, useArticleData } from "@features/article";

export function ArticlePage() {
  const article = useArticleData();

  return (
    <ArticleTemplate>
      <Helmet title={article?.title} />

      <Article />
    </ArticleTemplate>
  );
}

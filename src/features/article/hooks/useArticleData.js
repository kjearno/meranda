import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectArticle } from "../articleSlice";

export const useArticleData = () => {
  const { articleSlug } = useParams();

  const article = useSelector((state) => selectArticle(state, articleSlug));

  return article;
};

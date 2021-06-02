import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCategoryData } from "@features/category";
import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import { selectUserById } from "@shared/entities";
import { history } from "@shared/lib";
import {
  errorCleared,
  fetchArticle,
  selectError,
  selectStatus,
} from "../articleSlice";
import { useArticleData } from "./useArticleData";

export const useArticle = () => {
  const dispatch = useDispatch();
  const { categorySlug, articleSlug } = useParams();
  const category = useCategoryData();
  const article = useArticleData();

  const user = useSelector((state) => selectUserById(state, article?.userId));
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchArticle({ categorySlug, articleSlug }));
  }, [dispatch, categorySlug, articleSlug]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (error) {
        dispatch(errorCleared());
      }
    });

    return unlisten;
  }, [dispatch, error]);

  return {
    article,
    category,
    user,
    isLoading:
      (status === IDLE_STATUS && !article) || status === LOADING_STATUS,
    error,
  };
};

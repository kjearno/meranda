import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import { selectUserById } from "@shared/entities";
import {
  errorCleared,
  fetchArticle,
  selectError,
  selectStatus,
} from "../articleSlice";
import { useArticleData } from "./useArticleData";

export const useArticle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { articleSlug } = useParams();
  const article = useArticleData();

  const user = useSelector((state) => selectUserById(state, article?.userId));
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchArticle(articleSlug));
  }, [dispatch, articleSlug]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (error) {
        dispatch(errorCleared());
      }
    });

    return unlisten;
  }, [dispatch, error, history]);

  return {
    article,
    user,
    isLoading:
      (status === IDLE_STATUS && !article) || status === LOADING_STATUS,
    error,
  };
};

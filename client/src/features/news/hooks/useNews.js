import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "@shared/constants";
import {
  fetchNews,
  pageChanged,
  selectPageId,
  selectPageStatus,
  selectPosts,
  selectTotalNews,
} from "../newsSlice";

export const useNews = () => {
  const dispatch = useDispatch();

  const current = useSelector(selectPageId);
  const status = useSelector(selectPageStatus);
  const posts = useSelector(selectPosts);
  const total = useSelector(selectTotalNews);

  useEffect(() => {
    dispatch(fetchNews(current));
  }, [dispatch, current]);

  const handlePageChange = (page) => {
    dispatch(pageChanged(page));
  };

  return {
    posts,
    isLoading: status === LOADING_STATUS,
    current,
    pageSize: 2,
    total,
    onChange: handlePageChange,
  };
};

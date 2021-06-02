import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { scroller } from "react-scroll";
import queryString from "query-string";
import { LOADING_STATUS } from "@shared/constants";
import {
  fetchPage,
  pageChanged,
  selectPageError,
  selectPageStatus,
  selectPosts,
  selectTotalPosts,
} from "../store";

export const usePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categorySlug } = useParams();

  const error = useSelector((state) => selectPageError(state, categorySlug));
  const status = useSelector((state) => selectPageStatus(state, categorySlug));
  const posts = useSelector((state) => selectPosts(state, categorySlug));
  const totalPosts = useSelector((state) =>
    selectTotalPosts(state, categorySlug)
  );

  const { page = 1 } = queryString.parse(history.location.search, {
    parseNumbers: true,
  });

  useEffect(() => {
    dispatch(pageChanged(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchPage({ categorySlug, page }));
  }, [dispatch, categorySlug, page]);

  const handlePageChange = (current) => {
    history.push({
      search: queryString.stringify({
        page: current,
      }),
    });

    scroller.scrollTo("categoryContent", { smooth: true, offset: -10 });
  };

  return {
    posts,
    isLoading: status === LOADING_STATUS,
    error,
    current: page,
    pageSize: 5,
    total: totalPosts,
    onChange: handlePageChange,
  };
};

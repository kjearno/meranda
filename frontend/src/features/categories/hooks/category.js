import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import { history } from "@lib/routing";
import {
  categoriesOperations,
  categoriesSelectors
} from "../modules/categories";

export const useCategory = () => {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();

  const { page, error } = useSelector(categoriesSelectors.everything);
  const category = useSelector(categoriesSelectors.categoryData);
  const loading = useSelector(categoriesSelectors.pageLoading);
  const posts = useSelector(categoriesSelectors.posts);
  const postsCount = useSelector(categoriesSelectors.postsCount);

  const { search } = history.location;

  useEffect(() => {
    dispatch(categoriesOperations.fetchPage(categorySlug));
  }, [dispatch, categorySlug, search]);

  const handlePageChange = current => {
    const search = queryString.stringify({
      page: current
    });

    history.push({
      pathname: categorySlug,
      search
    });
  };

  return {
    category,
    error,
    isLoading: loading,
    posts,
    noRecords: !loading && !posts.length,
    pagination: {
      current: page,
      pageSize: 5,
      total: postsCount,
      onChange: handlePageChange
    }
  };
};

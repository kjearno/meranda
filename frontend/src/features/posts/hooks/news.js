import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsOperations, postsSelectors } from "../modules/posts";

export const useNews = () => {
  const dispatch = useDispatch();

  const { count, page } = useSelector(postsSelectors.news);
  const { loading, items } = useSelector(postsSelectors.newsPage);

  useEffect(() => {
    dispatch(postsOperations.fetchNews());
  }, [dispatch, page]);

  const handlePageChange = current => {
    dispatch(postsOperations.setNewsPage(current));
  };

  return {
    items,
    isLoading: loading,
    pagination: {
      current: page,
      pageSize: 2,
      total: count,
      onChange: handlePageChange
    }
  };
};

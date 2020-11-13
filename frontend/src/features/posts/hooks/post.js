import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postsOperations, postsSelectors } from "../modules/posts";

export const usePost = () => {
  const dispatch = useDispatch();
  const { categorySlug, postSlug } = useParams();

  const { post, loading, error } = useSelector(postsSelectors.post);

  useEffect(() => {
    dispatch(postsOperations.fetchPost(categorySlug, postSlug));
  }, [dispatch, categorySlug, postSlug]);

  return {
    post,
    isLoading: loading,
    error
  };
};

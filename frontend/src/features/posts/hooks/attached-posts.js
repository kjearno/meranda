import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsOperations, postsSelectors } from "../modules/posts";

export const useAttachedPosts = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(postsSelectors.attachedPosts);

  useEffect(() => {
    dispatch(postsOperations.fetchAttachedPosts());
  }, [dispatch]);

  return {
    items,
    isLoading: loading
  };
};

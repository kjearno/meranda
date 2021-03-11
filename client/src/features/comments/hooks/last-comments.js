import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsOperations, commentsSelectors } from "../modules/comments";

export const useLastComments = () => {
  const dispatch = useDispatch();

  const { fetched, loading, items } = useSelector(
    commentsSelectors.lastComments
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(commentsOperations.fetchLastComments());
    }
  }, [dispatch, fetched]);

  return {
    items,
    isLoading: loading
  };
};

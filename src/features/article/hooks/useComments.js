import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import { loadComments, selectComments, selectStatus } from "../commentsSlice";

export const useComments = (postId) => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const comments = useSelector((state) => selectComments(state, postId));

  useEffect(() => {
    dispatch(loadComments(postId));
  }, [dispatch, postId]);

  return {
    comments,
    isLoading: status === IDLE_STATUS || status === LOADING_STATUS,
  };
};

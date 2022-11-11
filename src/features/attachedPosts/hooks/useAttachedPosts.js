import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import {
  fetchAttachedPosts,
  selectAttachedPosts,
  selectStatus,
} from "../attachedPostsSlice";

export const useAttachedPosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAttachedPosts);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchAttachedPosts());
  }, [dispatch]);

  return {
    posts,
    isLoading: status === IDLE_STATUS || status === LOADING_STATUS,
  };
};

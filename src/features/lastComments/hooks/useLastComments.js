import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import {
  fetchLastComments,
  selectLastComments,
  selectStatus,
} from "../lastCommentsSlice";

export const useLastComments = () => {
  const dispatch = useDispatch();

  const comments = useSelector(selectLastComments);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchLastComments());
  }, [dispatch]);

  return {
    comments,
    isLoading: status === IDLE_STATUS || status === LOADING_STATUS,
  };
};

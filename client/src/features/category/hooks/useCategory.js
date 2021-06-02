import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import { history } from "@shared/lib";
import { errorCleared, selectError, selectStatus } from "../store";
import { useCategoryData } from "./useCategoryData";

export const useCategory = () => {
  const dispatch = useDispatch();
  const category = useCategoryData();

  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (error) {
        dispatch(errorCleared());
      }
    });

    return unlisten;
  }, [dispatch, error]);

  return {
    category,
    isLoading:
      (status === IDLE_STATUS && !category) || status === LOADING_STATUS,
    error,
  };
};

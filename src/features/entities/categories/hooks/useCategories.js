import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IDLE_STATUS, LOADING_STATUS } from "@shared/constants";
import { selectAllCategories } from "@shared/entities";
import { fetchCategories, selectCategoriesStatus } from "../categoriesSlice";

export const useCategories = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategories);
  const status = useSelector(selectCategoriesStatus);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.slug !== "no-category"),
    [categories]
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return {
    categories: filteredCategories,
    isLoading: status === IDLE_STATUS || status === LOADING_STATUS,
  };
};

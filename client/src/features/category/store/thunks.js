import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCategory, fetchPosts } from "@features/entities";
import { FAILED_STATUS, SUCCEEDED_STATUS } from "@shared/constants";
import { NotFoundError } from "@shared/lib";
import {
  selectCategory,
  selectCategoryId,
  selectPageStatus,
} from "./selectors";

export const fetchPage = createAsyncThunk(
  "category/fetchPage",
  async ({ categorySlug, page }, { dispatch, getState }) => {
    const category = selectCategory(getState(), categorySlug);

    if (!category) {
      await dispatch(fetchCategory(categorySlug));
    }

    const categoryId = selectCategoryId(getState(), categorySlug);

    if (!categoryId) {
      throw new Error();
    }

    const res = await dispatch(
      fetchPosts({
        categoryId,
        page,
        limit: 5,
        sortBy: "DESC",
      })
    );

    const { total, entities } = res.payload;

    if ((total && !entities.posts) || (!total && page !== 1)) {
      throw new NotFoundError("Page not found");
    }

    return {
      total,
      posts: entities.posts,
    };
  },
  {
    condition: ({ categorySlug }, { getState }) => {
      const status = selectPageStatus(getState(), categorySlug);

      if (status === SUCCEEDED_STATUS || status === FAILED_STATUS) {
        return false;
      }
    },
  }
);

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { fetchCategory, fetchPost, selectAllPosts } from "@features/entities";
import {
  FAILED_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { NotFoundError } from "@shared/lib";

export const selectError = (state) => state.article.data.error;
export const selectStatus = (state) => state.article.data.status;
export const selectArticle = createSelector(
  selectAllPosts,
  (_, articleSlug) => articleSlug,
  (posts, articleSlug) => posts.find((post) => post.slug === articleSlug)
);

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async ({ categorySlug, articleSlug }, { dispatch }) => {
    const category = await dispatch(fetchCategory(categorySlug));

    if (category.error) {
      throw category.error;
    }

    const res = await dispatch(fetchPost(articleSlug));

    if (!res.payload) {
      throw new NotFoundError();
    }
  },
  {
    condition: ({ articleSlug }, { getState }) => {
      const article = selectArticle(getState(), articleSlug);

      if (article) {
        return false;
      }
    },
  }
);

const initialState = {
  status: IDLE_STATUS,
  error: null,
};

const slice = createSlice({
  name: "article",
  initialState,
  reducers: {
    errorCleared: (state) => {
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchArticle.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.error;
    },
  },
});

export const { errorCleared } = slice.actions;

export default slice.reducer;

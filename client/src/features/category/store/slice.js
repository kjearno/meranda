import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "@features/entities";
import {
  FAILED_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { fetchPage } from "./thunks";

const initialState = {
  page: 1,
  pagination: {},
  status: IDLE_STATUS,
  error: null,
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    errorCleared: (state) => {
      state.status = initialState.status;
      state.error = initialState.error;
    },
    pageChanged: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [fetchCategory.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchCategory.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
    },
    [fetchCategory.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.error;
    },
    [fetchPage.pending]: (state, action) => {
      const { pagination } = state;
      const { categorySlug, page } = action.meta.arg;

      if (!pagination[categorySlug]) {
        pagination[categorySlug] = { totalPosts: 0, pages: {} };
      }

      pagination[categorySlug].pages[page] = {
        postIds: [],
        status: LOADING_STATUS,
        error: null,
      };
    },
    [fetchPage.fulfilled]: (state, action) => {
      const { pagination } = state;
      const { categorySlug, page } = action.meta.arg;
      const { total, posts = {} } = action.payload;

      pagination[categorySlug].totalPosts = total;
      pagination[categorySlug].pages[page].postIds = Object.keys(posts).map(
        Number
      );
      pagination[categorySlug].pages[page].status = SUCCEEDED_STATUS;
    },
    [fetchPage.rejected]: (state, action) => {
      const { pagination } = state;
      const { categorySlug, page } = action.meta.arg;

      pagination[categorySlug].pages[page].status = FAILED_STATUS;
      pagination[categorySlug].pages[page].error = action.error;
    },
  },
});

export const { errorCleared, pageChanged } = slice.actions;

export default slice.reducer;

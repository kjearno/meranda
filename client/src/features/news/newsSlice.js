import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchPosts, selectAllPosts } from "@features/entities";
import { LOADING_STATUS, SUCCEEDED_STATUS } from "@shared/constants";

export const selectPageId = (state) => state.news.page;
export const selectPagination = (state) => state.news.pagination;
export const selectTotalNews = (state) => state.news.total;

export const selectPage = createSelector(
  selectPageId,
  selectPagination,
  (pageId, pagination) => {
    const pageShape = {
      postIds: [],
      status: LOADING_STATUS,
    };

    return pagination[pageId] || pageShape;
  }
);

export const selectPostIds = createSelector(selectPage, (page) => page.postIds);

export const selectPageStatus = createSelector(
  selectPage,
  (page) => page.status
);

export const selectPosts = createSelector(
  selectAllPosts,
  selectPostIds,
  (posts, postIds) => posts.filter((post) => postIds.includes(post.id))
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (page, { dispatch }) => {
    const res = await dispatch(fetchPosts({ page, limit: 2, sortBy: "DESC" }));

    return {
      posts: res.payload.entities.posts,
      total: res.payload.total,
    };
  },
  {
    condition: (_, { getState }) => {
      const status = selectPageStatus(getState());

      if (status === SUCCEEDED_STATUS) {
        return false;
      }
    },
  }
);

const initialState = {
  page: 1,
  total: 0,
  pagination: {},
};

const slice = createSlice({
  name: "news",
  initialState,
  reducers: {
    pageChanged: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [fetchNews.pending]: (state, action) => {
      const pageId = action.meta.arg;

      state.pagination[pageId] = {
        postIds: [],
        status: LOADING_STATUS,
      };
    },
    [fetchNews.fulfilled]: (state, action) => {
      const pageId = action.meta.arg;
      const { posts, total } = action.payload;

      state.total = total;
      state.pagination[pageId].status = SUCCEEDED_STATUS;
      state.pagination[pageId].postIds = Object.keys(posts).map(Number);
    },
  },
});

export const { pageChanged } = slice.actions;

export default slice.reducer;

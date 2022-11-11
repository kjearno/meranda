import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchComments, selectAllComments } from "@features/entities";
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";

export const selectPostIds = (state) => state.article.comments.postIds;
export const selectStatus = (state) => state.article.comments.status;
export const selectComments = createSelector(
  selectAllComments,
  (_, postId) => postId,
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
);

export const loadComments = createAsyncThunk(
  "article/loadComments",
  async (postId, { dispatch }) =>
    dispatch(fetchComments({ postId, limit: 100, sortBy: "DESC" })),
  {
    condition: (postId, { getState }) => {
      const postIds = selectPostIds(getState());

      if (postIds.includes(postId)) {
        return false;
      }
    },
  }
);

const initialState = {
  postIds: [],
  status: IDLE_STATUS,
};

const slice = createSlice({
  name: "article",
  initialState,
  extraReducers: {
    [loadComments.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [loadComments.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      const postId = action.meta.arg;

      if (state.postIds.indexOf(postId) === -1) {
        state.postIds.push(postId);
      }
    },
  },
});

export default slice.reducer;

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  createComment,
  fetchComments,
  selectAllComments,
} from "@features/entities";
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";

export const selectCommentIds = (state) => state.lastComments.commentIds;
export const selectStatus = (state) => state.lastComments.status;
export const selectLastComments = createSelector(
  selectAllComments,
  selectCommentIds,
  (comments, commentIds) =>
    comments.filter((comment) => commentIds.includes(comment.id))
);

export const fetchLastComments = createAsyncThunk(
  "lastComments/fetchLastComments",
  async (_, { dispatch }) => {
    const res = await dispatch(fetchComments({ limit: 5, sortBy: "DESC" }));
    return res.payload.comments;
  },
  {
    condition: (_, { getState }) => {
      const status = selectStatus(getState());

      if (status === LOADING_STATUS || status === SUCCEEDED_STATUS) {
        return false;
      }
    },
  }
);

const initialState = {
  commentIds: [],
  status: IDLE_STATUS,
};

const slice = createSlice({
  name: "lastComments",
  initialState,
  extraReducers: {
    [fetchLastComments.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      state.commentIds = Object.keys(action.payload).map(Number);
    },
    [createComment.fulfilled]: (state, action) => {
      state.commentIds.shift();
      state.commentIds.push(action.payload.id);
    },
  },
});

export default slice.reducer;

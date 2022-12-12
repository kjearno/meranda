import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { fetchPosts, selectAllPosts } from "@features/entities";
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";

export const selectPostIds = (state) => state.attachedPosts.postIds;
export const selectStatus = (state) => state.attachedPosts.status;
export const selectAttachedPosts = createSelector(
  selectAllPosts,
  selectPostIds,
  (posts, attachedIds) => posts.filter((post) => attachedIds.includes(post.id))
);

export const fetchAttachedPosts = createAsyncThunk(
  "attachedPosts/fetchAttachedPosts",
  async (_, { dispatch }) => {
    const res = await dispatch(
      fetchPosts({ isAttached: true, sortBy: "DESC" })
    );

    return res.payload.entities.posts;
  },
  {
    condition: (_, { getState }) => {
      const status = selectStatus(getState());

      if (status === SUCCEEDED_STATUS) {
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
  name: "attachedPosts",
  initialState,
  extraReducers: {
    [fetchAttachedPosts.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchAttachedPosts.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      state.postIds = Object.keys(action.payload).map(Number);
    },
  },
});

export default slice.reducer;

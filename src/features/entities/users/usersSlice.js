import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IDLE_STATUS } from "@shared/constants";
import { fetchComments } from "../comments";
import { fetchPost, fetchPosts } from "../posts";

const adapter = createEntityAdapter();

const initialState = adapter.getInitialState({
  status: IDLE_STATUS,
});

const slice = createSlice({
  name: "entities",
  initialState,
  extraReducers: {
    [fetchComments.fulfilled]: (state, action) => {
      const { users = {} } = action.payload;
      adapter.addMany(state, users);
    },
    [fetchPost.fulfilled]: (state, action) => {
      adapter.addMany(state, action.payload.users);
    },
    [fetchPosts.fulfilled]: (state, action) => {
      const { users = {} } = action.payload.entities;
      adapter.addMany(state, users);
    },
  },
});

export default slice.reducer;

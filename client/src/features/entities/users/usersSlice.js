import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { register, login } from "@features/auth";
import { updatePhoto } from "@features/profile";
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
    [register.fulfilled]: (state, action) => {
      adapter.addOne(state, action.payload);
    },
    [login.fulfilled]: (state, action) => {
      adapter.addOne(state, action.payload);
    },
    [updatePhoto.fulfilled]: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
  },
});

export default persistReducer(
  {
    key: "users",
    storage,
    whitelist: ["ids", "entities"],
    keyPrefix: "meranda:",
  },
  slice.reducer
);

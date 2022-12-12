import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { postEntity } from "@shared/entities";
import { axios } from "@shared/lib";
import { formatDates } from "@shared/utils";
import { fetchComments } from "../comments";

const adapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts,
} = adapter.getSelectors((state) => state.entities.posts);

export const fetchPosts = createAsyncThunk(
  "entities/fetchPosts",
  async (params) => {
    const res = await axios.get("/posts", { params });
    const normalized = normalize(res.data.rows, [postEntity]);

    return {
      total: res.data.count,
      entities: normalized.entities,
    };
  }
);

export const fetchPost = createAsyncThunk(
  "entities/fetchPost",
  async (slug) => {
    const res = await axios.get(`/posts?slug=${slug}`);
    const post = res.data.rows[0];

    if (!post) {
      throw new Error();
    }

    const normalized = normalize(post, postEntity);
    return normalized.entities;
  }
);

const initialState = adapter.getInitialState({
  status: IDLE_STATUS,
});

const slice = createSlice({
  name: "entities",
  initialState,
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      const { posts = {} } = action.payload.entities;
      const editedPosts = formatDates(posts);
      adapter.addMany(state, editedPosts);
    },
    [fetchPost.fulfilled]: (state, action) => {
      const editedPosts = formatDates(action.payload.posts);
      adapter.addMany(state, editedPosts);
    },
    [fetchComments.fulfilled]: (state, action) => {
      const { posts = {} } = action.payload;
      const editedPosts = formatDates(posts);
      adapter.addMany(state, editedPosts);
    },
  },
});

export default slice.reducer;

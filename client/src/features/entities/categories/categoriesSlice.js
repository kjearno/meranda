import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { axios, NotFoundError } from "@shared/lib";
import { fetchComments } from "../comments";
import { fetchPost, fetchPosts } from "../posts";

const adapter = createEntityAdapter({
  sortComparer: (a, b) => a.id - b.id,
});

export const selectCategoriesStatus = (state) =>
  state.entities.categories.status;

export const fetchCategories = createAsyncThunk(
  "entities/fetchCategories",
  async () => {
    const res = await axios.get("/categories?limit=100");
    return res.data.rows;
  },
  {
    condition: (_, { getState }) => {
      const status = selectCategoriesStatus(getState());

      if (status === SUCCEEDED_STATUS) {
        return false;
      }
    },
  }
);

export const fetchCategory = createAsyncThunk(
  "entities/fetchCategory",
  async (slug) => {
    const res = await axios.get(`/categories?slug=${slug}`);
    const category = res.data.rows[0];

    if (!category) {
      throw new NotFoundError();
    }

    return category;
  }
);

const initialState = adapter.getInitialState({
  status: IDLE_STATUS,
});

const slice = createSlice({
  name: "entities",
  initialState,
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      adapter.addMany(state, action.payload);
    },
    [fetchCategory.fulfilled]: (state, action) => {
      adapter.addOne(state, action.payload);
    },
    [fetchPosts.fulfilled]: (state, action) => {
      const { categories = {} } = action.payload.entities;
      adapter.addMany(state, categories);
    },
    [fetchPost.fulfilled]: (state, action) => {
      adapter.addMany(state, action.payload.categories);
    },
    [fetchComments.fulfilled]: (state, action) => {
      const { categories = {} } = action.payload;
      adapter.addMany(state, categories);
    },
  },
});

export default slice.reducer;

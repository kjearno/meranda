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
import { commentEntity } from "@shared/entities";
import { axios, formatDates } from "@shared/lib";

const adapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

export const {
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: selectTotalComments,
} = adapter.getSelectors((state) => state.entities.comments);

export const fetchComments = createAsyncThunk(
  "entities/fetchComments",
  async (params) => {
    const res = await axios.get("/comments", { params });
    const normalized = normalize(res.data.rows, [commentEntity]);
    return normalized.entities;
  }
);

export const createComment = createAsyncThunk(
  "entities/createComment",
  async ({ data, url = "/comments" }) => {
    const res = await axios.post(url, data);
    const normalized = normalize(res.data, commentEntity);
    return Object.values(normalized.entities.comments)[0];
  }
);

const initialState = adapter.getInitialState({
  status: IDLE_STATUS,
});

const slice = createSlice({
  name: "entities",
  initialState,
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;
      const { comments = {} } = action.payload;
      const editedComments = formatDates(comments);
      adapter.addMany(state, editedComments);
    },
    [createComment.fulfilled]: (state, action) => {
      const editedComment = formatDates(action.payload);
      adapter.addOne(state, editedComment);
    },
  },
});

export default slice.reducer;

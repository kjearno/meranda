import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createComment } from "@features/entities";
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";

export const selectStatus = (state) => state.article.form.status;

export const sendComment = createAsyncThunk(
  "article/sendComment",
  async ({ data, actions }, { dispatch }) => {
    await dispatch(createComment({ data, url: "/comments/me" }));
    actions.resetForm();
  }
);

const initialState = {
  status: IDLE_STATUS,
};

const slice = createSlice({
  name: "article",
  initialState,
  extraReducers: {
    [sendComment.pending]: (state) => {
      state.status = LOADING_STATUS;
    },
    [sendComment.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
      toast.success("Comment was sent successfully");
    },
  },
});

export default slice.reducer;

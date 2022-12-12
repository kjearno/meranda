import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  FAILED_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { axios } from "@shared/lib";

export const selectStatus = (state) => state.subscription.status;

export const subscribe = createAsyncThunk(
  "subscription/subscribe",
  async (values, { rejectWithValue }) => {
    try {
      await axios.post("/subscribers", values);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  status: IDLE_STATUS,
  error: null,
};

const slice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: {
    [subscribe.pending]: (state) => {
      state.status = LOADING_STATUS;
      state.error = initialState.error;
    },
    [subscribe.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
      toast.success("You have successfully subscribed");
    },
    [subscribe.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
  },
});

export default slice.reducer;

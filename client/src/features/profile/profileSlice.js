import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { login, logout, register } from "@features/auth";
import {
  FAILED_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { axios } from "@shared/lib";

export const selectError = (state) => state.profile.error;
export const selectStatus = (state) => state.profile.status;
export const selectMyId = (state) => state.profile.me;

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async ({ values, actions }, { rejectWithValue }) => {
    try {
      const res = await axios.patch("/users/me/password", values);
      actions.resetForm();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "profile/updatePhoto",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.patch("/users/me/photo", values);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  me: null,
  status: IDLE_STATUS,
  error: null,
};

const slice = createSlice({
  name: "profile",
  initialState,
  extraReducers: {
    [updatePassword.pending]: (state) => {
      state.status = LOADING_STATUS;
      state.error = initialState.error;
    },
    [updatePassword.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
      toast.success("Password changed successfully");
    },
    [updatePassword.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
    [updatePhoto.pending]: (state) => {
      state.status = LOADING_STATUS;
      state.error = initialState.error;
    },
    [updatePhoto.fulfilled]: (state, action) => {
      state.status = SUCCEEDED_STATUS;

      if (action.payload.photo) {
        toast.success("Photo changed successfully");
        return;
      }

      toast.success("Photo deleted successfully");
    },
    [updatePhoto.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
    [register.fulfilled]: (state, action) => {
      state.me = action.payload.id;
    },
    [login.fulfilled]: (state, action) => {
      state.me = action.payload.id;
    },
    [logout.pending]: (state) => {
      state.me = initialState.me;
    },
  },
});

export default persistReducer(
  {
    key: "profile",
    storage,
    whitelist: ["me"],
    keyPrefix: "meranda:",
  },
  slice.reducer
);

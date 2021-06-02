import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FAILED_STATUS,
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCEEDED_STATUS,
} from "@shared/constants";
import { axios } from "@shared/lib";
import { toast } from "react-toastify";

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectStatus = (state) => state.auth.status;

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/register", values);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", values);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  axios.get("/auth/logout");
});

const initialState = {
  isAuthenticated: false,
  status: IDLE_STATUS,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.pending]: (state) => {
      state.status = LOADING_STATUS;
      state.error = initialState.error;
    },
    [register.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
    [login.pending]: (state) => {
      state.status = LOADING_STATUS;
      state.error = initialState.error;
    },
    [login.fulfilled]: (state) => {
      state.status = SUCCEEDED_STATUS;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.status = FAILED_STATUS;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
    [logout.pending]: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export default persistReducer(
  {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated"],
    keyPrefix: "meranda:",
  },
  slice.reducer
);

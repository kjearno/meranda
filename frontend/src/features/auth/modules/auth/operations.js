import { axios } from "@lib/axios";
import { handleError } from "@lib/errors";
import * as actions from "./actions";

export const checkAuth = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/auth/token");
      dispatch(actions.authSuccess(res.data));
    } catch (err) {
      dispatch(actions.authFailure(err));
    }
  };
};

export const register = values => {
  return async dispatch => {
    dispatch(actions.authRequest());

    try {
      const res = await axios.post("/auth/register", values);
      dispatch(actions.authSuccess(res.data));
    } catch (err) {
      handleError(actions.authFailure, { err });
    }
  };
};

export const login = values => {
  return async dispatch => {
    dispatch(actions.authRequest());

    try {
      const res = await axios.post("/auth/login", values);
      dispatch(actions.authSuccess(res.data));
    } catch (err) {
      handleError(actions.authFailure, { err });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    await axios.get("/auth/logout");
    dispatch(actions.logoutSuccess());
  };
};

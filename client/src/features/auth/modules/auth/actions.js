import * as types from "./types";

export const authRequest = () => ({ type: types.AUTH_REQUEST });

export const authSuccess = user => ({
  type: types.AUTH_SUCCESS,
  payload: user
});

export const authFailure = error => ({
  type: types.AUTH_FAILURE,
  payload: error
});

export const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });

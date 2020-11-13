import * as types from "./types";

export const subscribeRequest = () => ({ type: types.SUBSCRIBE_REQUEST });

export const subscribeSuccess = () => ({ type: types.SUBSCRIBE_SUCCESS });

export const subscribeFailure = error => ({
  type: types.SUBSCRIBE_FAILURE,
  error
});

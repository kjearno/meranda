import * as types from "./types";

export const fetchLastCommentsRequest = () => ({
  type: types.FETCH_LAST_COMMENTS_REQUEST
});

export const fetchLastCommentsSuccess = comments => ({
  type: types.FETCH_LAST_COMMENTS_SUCCESS,
  payload: comments
});

export const sendCommentRequest = () => ({ type: types.SEND_COMMENT_REQUEST });

export const sendCommentSuccess = comment => ({
  type: types.SEND_COMMENT_SUCCESS,
  payload: comment
});

export const sendCommentFailure = error => ({
  type: types.SEND_COMMENT_FAILURE,
  payload: error
});

import * as types from "./types";

export const fetchAttachedPostsRequest = () => ({
  type: types.FETCH_ATTACHED_POSTS_REQUEST
});

export const fetchAttachedPostsSuccess = posts => ({
  type: types.FETCH_ATTACHED_POSTS_SUCCESS,
  payload: posts
});

export const setCurrentPost = data => ({
  type: types.SET_CURRENT_POST,
  payload: data
});

export const fetchPostRequest = () => ({ type: types.FETCH_POST_REQUEST });

export const fetchPostSuccess = () => ({ type: types.FETCH_POST_SUCCESS });

export const fetchPostFailure = error => ({
  type: types.FETCH_POST_FAILURE,
  payload: error
});

export const fetchNewsRequest = page => ({
  type: types.FETCH_NEWS_REQUEST,
  payload: page
});

export const fetchNewsSuccess = data => ({
  type: types.FETCH_NEWS_SUCCESS,
  payload: data
});

export const setNewsPage = page => ({
  type: types.SET_NEWS_PAGE,
  payload: page
});

export const appendPosts = posts => ({
  type: types.APPEND_POSTS,
  payload: posts
});

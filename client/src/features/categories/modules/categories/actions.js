import * as types from "./types";

export const initPage = data => ({
  type: types.INIT_PAGE,
  payload: data
});

export const fetchPageRequest = data => ({
  type: types.FETCH_PAGE_REQUEST,
  payload: data
});

export const fetchPageSuccess = data => ({
  type: types.FETCH_PAGE_SUCCESS,
  payload: data
});

export const fetchPageFailure = error => ({
  type: types.FETCH_PAGE_FAILURE,
  payload: error
});

export const fetchCategorySuccess = data => ({
  type: types.FETCH_CATEGORY_SUCCESS,
  payload: data
});

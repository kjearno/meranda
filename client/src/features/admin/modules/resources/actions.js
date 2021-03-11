import * as types from "./types";

export const setCurrent = current => ({
  type: types.SET_CURRENT,
  payload: current
});

export const fetchResourceRequest = name => ({
  type: types.FETCH_RESOURCE_REQUEST,
  payload: name
});

export const fetchResourceSuccess = resource => ({
  type: types.FETCH_RESOURCE_SUCCESS,
  payload: resource
});

export const fetchItemRequest = resourceName => ({
  type: types.FETCH_ITEM_REQUEST,
  payload: resourceName
});

export const fetchItemSuccess = data => ({
  type: types.FETCH_ITEM_SUCCESS,
  payload: data
});

export const fetchItemFailure = error => ({
  type: types.FETCH_ITEM_FAILURE,
  payload: error
});

export const createItemRequest = () => ({
  type: types.CREATE_ITEM_REQUEST
});

export const createItemSuccess = () => ({
  type: types.CREATE_ITEM_SUCCESS
});

export const createItemFailure = () => ({
  type: types.CREATE_ITEM_FAILURE
});

export const editItemRequest = () => ({
  type: types.EDIT_ITEM_REQUEST
});

export const editItemSuccess = data => ({
  type: types.EDIT_ITEM_SUCCESS,
  payload: data
});

export const editItemFailure = () => ({
  type: types.EDIT_ITEM_FAILURE
});

export const deleteItemRequest = data => ({
  type: types.DELETE_ITEM_REQUEST,
  payload: data
});

export const deleteItemSuccess = () => ({
  type: types.DELETE_ITEM_SUCCESS
});

export const deleteItemsRequest = data => ({
  type: types.DELETE_ITEMS_REQUEST,
  payload: data
});

export const deleteItemsSuccess = () => ({
  type: types.DELETE_ITEMS_SUCCESS
});

export const fetchRelationRequest = name => ({
  type: types.FETCH_RELATION_REQUEST,
  payload: name
});

export const fetchRelationSuccess = relationData => ({
  type: types.FETCH_RELATION_SUCCESS,
  payload: relationData
});

export const setSelectedRowKeys = keys => ({
  type: types.SET_SELECTED_ROW_KEYS,
  payload: keys
});

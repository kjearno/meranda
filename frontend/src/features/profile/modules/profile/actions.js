import * as types from "./types";

export const updateProfileRequest = () => ({
  type: types.UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = user => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: user
});

export const updateProfileFailure = error => ({
  type: types.UPDATE_PROFILE_FAILURE,
  error
});

export const deletePhotoRequest = () => ({
  type: types.DELETE_PHOTO_REQUEST
});

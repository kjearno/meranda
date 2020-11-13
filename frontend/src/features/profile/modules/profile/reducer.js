import produce from "immer";
import { authTypes } from "@features/auth";
import * as types from "./types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
  error: null
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
      draft.error = null;
      draft.loading = true;
      break;

    case types.UPDATE_PROFILE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));

      draft.user = payload;
      draft.loading = false;
      break;

    case types.UPDATE_PROFILE_FAILURE:
      draft.error = payload;
      draft.loading = false;
      break;

    case types.DELETE_PHOTO_REQUEST:
      draft.user.photo = "";
      draft.loading = true;
      break;

    case authTypes.AUTH_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));

      draft.user = payload;
      break;

    case authTypes.AUTH_FAILURE:
      localStorage.removeItem("user");

      draft.user = {};
      break;

    case authTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("user");

      draft.user = {};
      break;

    default:
      return draft;
  }
}, initialState);

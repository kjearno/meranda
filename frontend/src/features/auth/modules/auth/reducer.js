import produce from "immer";
import * as types from "./types";

const initialState = {
  isAuthenticated: !!JSON.parse(localStorage.getItem("user")),
  error: null,
  loading: false
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.AUTH_REQUEST:
      draft.error = null;
      draft.loading = true;
      break;

    case types.AUTH_SUCCESS:
      draft.isAuthenticated = true;
      draft.loading = false;
      break;

    case types.AUTH_FAILURE:
      draft.isAuthenticated = false;
      draft.error = payload;
      draft.loading = false;
      break;

    case types.LOGOUT_SUCCESS:
      draft.isAuthenticated = false;
      break;

    default:
      return draft;
  }
}, initialState);

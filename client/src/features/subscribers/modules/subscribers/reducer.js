import produce from "immer";
import * as types from "./types";

const initialState = {
  loading: false,
  error: null
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.SUBSCRIBE_REQUEST:
      draft.error = null;
      draft.loading = true;
      break;

    case types.SUBSCRIBE_SUCCESS:
      draft.loading = false;
      break;

    case types.SUBSCRIBE_FAILURE:
      draft.error = payload;
      draft.loading = false;
      break;

    default:
      return draft;
  }
}, initialState);

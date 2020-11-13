import produce from "immer";
import { formatDates } from "@lib/date-formatter";
import { sliceComments, sliceComment } from "../../lib/slicer";
import * as selectors from "./selectors";
import * as types from "./types";

const initialState = {
  current: {
    loading: false,
    error: null
  },
  lastComments: {
    items: [],
    fetched: false,
    loading: false
  }
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.FETCH_LAST_COMMENTS_REQUEST:
      draft.lastComments.loading = true;
      break;

    case types.FETCH_LAST_COMMENTS_SUCCESS: {
      const lastComments = sliceComments(formatDates(payload));

      draft.lastComments = {
        items: lastComments,
        fetched: true,
        loading: false
      };
      break;
    }

    case types.SEND_COMMENT_REQUEST:
      draft.current.error = null;
      draft.current.loading = true;
      break;

    case types.SEND_COMMENT_SUCCESS: {
      const lastComments = selectors.lastComments({ comments: draft });
      const comment = sliceComment(formatDates(payload));

      draft.lastComments.items = [
        comment,
        ...lastComments.items.slice(
          0,
          lastComments.items.length >= 5 ? -1 : lastComments.items.length
        )
      ];
      draft.current.loading = false;
      break;
    }

    case types.SEND_COMMENT_FAILURE:
      console.log("payload", payload);
      draft.current.error = payload;
      draft.current.loading = false;
      break;

    default:
      return draft;
  }
}, initialState);

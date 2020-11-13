import produce from "immer";
import { mapKeys } from "lodash-es";
import { commentsTypes } from "@features/comments";
import { formatDates } from "@lib/date-formatter";
import * as selectors from "./selectors";
import * as types from "./types";

const initialState = {
  attached: {
    postIds: [],
    fetched: false,
    loading: false
  },
  current: {
    categorySlug: "",
    postSlug: "",
    error: null,
    loading: false
  },
  news: {
    pages: {},
    count: 1,
    page: 1
  },
  posts: {}
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.FETCH_ATTACHED_POSTS_REQUEST:
      draft.attached.loading = true;
      break;

    case types.FETCH_ATTACHED_POSTS_SUCCESS: {
      const postIds = payload.map(post => post.id);

      draft.attached.postIds = postIds;
      draft.attached.fetched = true;
      draft.attached.loading = false;
      break;
    }

    case types.FETCH_NEWS_REQUEST:
      draft.news.pages[payload] = {
        loading: true,
        postIds: []
      };
      break;

    case types.FETCH_NEWS_SUCCESS: {
      const { page, news } = payload;

      const { count, rows } = news;
      const postIds = rows.map(post => post.id);

      draft.news.count = count;
      draft.news.pages[page] = { loading: false, postIds };
      break;
    }

    case types.SET_NEWS_PAGE:
      draft.news.page = payload;
      break;

    case types.SET_CURRENT_POST: {
      const { categorySlug, postSlug } = payload;

      draft.current.categorySlug = categorySlug;
      draft.current.postSlug = postSlug;
      draft.current.error = null;
      break;
    }

    case types.FETCH_POST_REQUEST:
      draft.current.loading = true;
      break;

    case types.FETCH_POST_SUCCESS:
      draft.current.loading = false;
      break;

    case types.FETCH_POST_FAILURE:
      draft.current.error = payload;
      draft.current.loading = false;
      break;

    case types.APPEND_POSTS: {
      const posts = formatDates(payload);

      draft.posts = Object.assign(draft.posts, mapKeys(posts, "id"));
      break;
    }

    case commentsTypes.SEND_COMMENT_SUCCESS: {
      const comment = formatDates(payload);
      const { post } = selectors.post({ posts: draft });

      post.comments.push(comment);
      break;
    }

    default:
      return draft;
  }
}, initialState);

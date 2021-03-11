import produce from "immer";
import * as selectors from "./selectors";
import * as types from "./types";

const initialState = {
  slug: "",
  page: 1,
  error: null
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.INIT_PAGE: {
      const { category, page } = payload;

      draft.slug = category;
      draft.page = page;
      draft.error = null;
      break;
    }

    case types.FETCH_PAGE_REQUEST: {
      const { category, page } = payload;

      draft[category] = {
        ...draft[category],
        pages: {
          ...draft[category]?.pages,
          [page]: {
            postIds: [],
            loading: true
          }
        }
      };
      break;
    }

    case types.FETCH_PAGE_SUCCESS: {
      const { category, page, postsData } = payload;
      const { count, rows } = postsData;

      const postIds = rows.map(post => post.id);

      draft[category].pages.postsCount = count;
      draft[category].pages[page] = { postIds, loading: false };
      break;
    }

    case types.FETCH_PAGE_FAILURE: {
      const { slug } = selectors.everything({ categories: draft });

      draft.error = payload;

      delete draft[slug];
      break;
    }

    case types.FETCH_CATEGORY_SUCCESS: {
      const { slug, data } = payload;

      draft[slug] = Object.assign(draft[slug], data);
      break;
    }

    default:
      return draft;
  }
}, initialState);

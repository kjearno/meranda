import queryString from "query-string";
import { postsOperations } from "@features/posts";
import { axios } from "@lib/axios";
import { NotFoundError, handleError } from "@lib/errors";
import { history } from "@lib/routing";
import * as actions from "./actions";
import * as selectors from "./selectors";

export const fetchPage = category => {
  return async (dispatch, getState) => {
    const { page = 1 } = queryString.parse(history.location.search, {
      parseNumbers: true
    });

    const isPageInitialized = selectors.isPageInitialized(getState(), {
      slug: category,
      page: page
    });
    if (isPageInitialized) return;

    dispatch(actions.initPage({ category, page }));

    const isPageExist = selectors.page(getState());
    if (isPageExist) return;

    dispatch(actions.fetchPageRequest({ category, page }));

    try {
      await dispatch(fetchCategory(category));

      const { id: categoryId } = selectors.categoryData(getState());

      const search = queryString.stringify({
        page,
        limit: 5,
        categoryId
      });

      const res = await axios.get(`/posts?${search}`);

      dispatch(postsOperations.appendPosts(res.data.rows));
      dispatch(
        actions.fetchPageSuccess({ category, page, postsData: res.data })
      );
    } catch (err) {
      handleError(actions.fetchPageFailure, { err, showMessages: false });
    }
  };
};

export const fetchCategory = slug => {
  return async (dispatch, getState) => {
    const isCategoryExist = selectors.isCategoryExist(getState());
    if (isCategoryExist) return;

    try {
      const res = await axios.get(`/categories?slug=${slug}`);

      if (!res.data.count) {
        throw new NotFoundError("No category");
      }

      const data = res.data.rows[0];

      dispatch(actions.fetchCategorySuccess({ slug, data }));
    } catch (err) {
      throw err;
    }
  };
};

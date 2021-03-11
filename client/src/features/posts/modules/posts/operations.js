import { axios } from "@lib/axios";
import { handleError } from "@lib/errors";
import * as actions from "./actions";
import * as selectors from "./selectors";

export const fetchAttachedPosts = () => {
  return async (dispatch, getState) => {
    const isFetched = selectors.attachedPostsFetched(getState());

    if (isFetched) return;

    dispatch(actions.fetchAttachedPostsRequest());

    const res = await axios.get("/posts?isAttached=true");
    const posts = res.data.rows;

    dispatch(appendPosts(posts));
    dispatch(actions.fetchAttachedPostsSuccess(posts));
  };
};

export const fetchNews = () => {
  return async (dispatch, getState) => {
    const isPageExist = selectors.newsPageExist(getState());

    if (isPageExist) return;

    const page = selectors.newsCurrentPage(getState());

    dispatch(actions.fetchNewsRequest(page));

    const res = await axios.get(`/posts?limit=2&page=${page}`);

    dispatch(actions.appendPosts(res.data.rows));
    dispatch(actions.fetchNewsSuccess({ page, news: res.data }));
  };
};

export const setNewsPage = actions.setNewsPage;

export const fetchPost = (categorySlug, postSlug) => {
  return async (dispatch, getState) => {
    const isPostSetted = selectors.isPostSetted(getState(), {
      categorySlug,
      postSlug
    });
    if (isPostSetted) return;

    dispatch(actions.setCurrentPost({ categorySlug, postSlug }));

    const isPostExist = selectors.isPostExist(getState());
    if (isPostExist) return;

    dispatch(actions.fetchPostRequest());

    try {
      const res = await axios.get(
        `/categories/${categorySlug}/posts/${postSlug}`
      );

      dispatch(appendPosts([res.data]));
      dispatch(actions.fetchPostSuccess());
    } catch (err) {
      handleError(actions.fetchPostFailure, { err, showMessages: false });
    }
  };
};

export const appendPosts = actions.appendPosts;

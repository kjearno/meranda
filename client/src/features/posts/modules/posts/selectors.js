import { createSelector } from "reselect";
import _, { isEmpty } from "lodash-es";

export const everything = state => state.posts;

export const attached = state => everything(state).attached;
export const current = state => everything(state).current;
export const news = state => everything(state).news;
export const posts = state => everything(state).posts;

export const newsCurrentPage = state => news(state).page;

export const newsPage = createSelector(
  news,
  posts,

  (news, posts) => {
    const { page, pages } = news;

    const { loading = true, postIds = [] } = pages[page] || {};

    return {
      loading,
      items: _.chain(posts)
        .values()
        .filter(post => postIds.includes(post.id))
        .orderBy(["id"], ["desc"])
        .value()
    };
  }
);

export const newsPageExist = state => {
  const page = newsCurrentPage(state);

  return !!news(state).pages[page];
};

export const attachedPosts = createSelector(
  attached,
  posts,

  (attached, posts) => {
    const { postIds, loading } = attached;

    return {
      loading,
      items: _.chain(posts)
        .values()
        .filter(post => postIds.includes(post.id))
        .orderBy(["id"], ["desc"])
        .value()
    };
  }
);

export const attachedPostsFetched = state => attached(state).fetched;

export const post = createSelector(
  current,
  posts,

  (current, posts) => {
    const { categorySlug, postSlug, loading, error } = current;

    if (!categorySlug || !postSlug) {
      return { loading: true, post: {} };
    }

    const post = Object.values(posts).find(
      post => post.category.slug === categorySlug && post.slug === postSlug
    );

    return {
      post,
      loading,
      error
    };
  }
);

export const isPostExist = createSelector(
  post,

  ({ post }) => !isEmpty(post)
);

export const isPostSetted = (state, props) => {
  const { categorySlug, postSlug } = current(state);

  return _.isEqual(props, { categorySlug, postSlug });
};

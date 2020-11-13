import { createSelector } from "reselect";
import _, { isEqual } from "lodash-es";
import { postsSelectors } from "@features/posts";

export const everything = state => state.categories;

export const category = state => {
  const { slug } = everything(state);

  return everything(state)[slug];
};

export const categoryData = createSelector(category, (category = {}) => {
  const { id, name, slug } = category;

  return { id, name, slug };
});

export const isCategoryExist = createSelector(
  categoryData,

  categoryData => _.values(categoryData).some(value => value !== undefined)
);

export const pages = state => category(state)?.pages;

export const postsCount = state => pages(state)?.postsCount;

export const page = state => {
  const { page } = everything(state);

  return pages(state) && pages(state)[page];
};

export const pageLoading = state => page(state)?.loading;
export const postIds = state => page(state)?.postIds;

export const isPageInitialized = (state, props) => {
  const { slug, page } = everything(state);

  return isEqual(props, { slug, page });
};

export const posts = createSelector(
  postsSelectors.posts,
  postIds,

  (posts, postIds = []) =>
    _.chain(posts)
      .values()
      .filter(post => postIds.includes(post.id))
      .orderBy(["id"], ["desc"])
      .value()
);

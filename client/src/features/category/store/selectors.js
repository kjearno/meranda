import { createSelector } from "@reduxjs/toolkit";
import { selectAllPosts } from "@features/entities";
import { LOADING_STATUS } from "@shared/constants";
import { selectAllCategories } from "@shared/entities";

export const selectError = (state) => state.category.error;
export const selectStatus = (state) => state.category.status;
export const selectPageId = (state) => state.category.page;
export const selectPagination = (state) => state.category.pagination;
export const selectSlug = (_, slug) => slug;

export const selectCategory = createSelector(
  selectAllCategories,
  selectSlug,
  (categories, slug) => categories.find((category) => category.slug === slug)
);

export const selectCategoryId = createSelector(
  selectCategory,
  (category) => category.id
);

export const selectTotalPosts = createSelector(
  selectPagination,
  selectSlug,
  (pagination, categorySlug) => pagination[categorySlug]?.totalPosts
);

export const selectPage = createSelector(
  selectPagination,
  selectSlug,
  selectPageId,
  (pagination, categorySlug, pageId) => {
    const pageShape = {
      postIds: [],
      status: LOADING_STATUS,
      error: null,
    };

    return pagination[categorySlug]?.pages[pageId] || pageShape;
  }
);

export const selectPageError = createSelector(selectPage, (page) => page.error);

export const selectPageStatus = createSelector(
  selectPage,
  (page) => page.status
);

export const selectPosts = createSelector(
  selectAllPosts,
  selectPage,
  (posts, page) => {
    const { postIds } = page;
    return posts.filter((post) => postIds.includes(post.id));
  }
);

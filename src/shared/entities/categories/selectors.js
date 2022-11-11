import { createEntityAdapter } from "@reduxjs/toolkit";

const adapter = createEntityAdapter();

export const {
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectTotalCategories,
} = adapter.getSelectors((state) => state.entities.categories);

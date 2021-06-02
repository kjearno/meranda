import { createEntityAdapter } from "@reduxjs/toolkit";

const adapter = createEntityAdapter();

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = adapter.getSelectors((state) => state.entities.users);

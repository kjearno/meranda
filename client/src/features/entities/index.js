import { combineReducers } from "@reduxjs/toolkit";

import { categoriesReducer } from "./categories";
import { commentsReducer } from "./comments";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";

export * from "./categories";
export * from "./comments";
export * from "./posts";
export * from "./users";

export const entitiesReducer = combineReducers({
  categories: categoriesReducer,
  comments: commentsReducer,
  posts: postsReducer,
  users: usersReducer,
});

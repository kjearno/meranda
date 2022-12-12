import { combineReducers } from "@reduxjs/toolkit";

import { commentsReducer } from "./comments";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";

export const entitiesReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  users: usersReducer,
});

export * from "./comments";
export * from "./posts";
export * from "./users";

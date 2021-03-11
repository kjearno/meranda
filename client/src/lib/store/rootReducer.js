import { combineReducers } from "redux";

import { adminReducer } from "@features/admin";
import { authReducer } from "@features/auth";
import { categoriesReducer } from "@features/categories";
import { commentsReducer } from "@features/comments";
import { postsReducer } from "@features/posts";
import { profileReducer } from "@features/profile";
import { subscribersReducer } from "@features/subscribers";

export const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  posts: postsReducer,
  profile: profileReducer,
  subscribers: subscribersReducer
});

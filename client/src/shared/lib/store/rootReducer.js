import { combineReducers } from "@reduxjs/toolkit";

import { articleReducer } from "@features/article";
import { attachedPostsReducer } from "@features/attachedPosts";
import { authReducer } from "@features/auth";
import { categoryReducer } from "@features/category";
import { entitiesReducer } from "@features/entities";
import { lastCommentsReducer } from "@features/lastComments";
import { newsReducer } from "@features/news";
import { profileReducer } from "@features/profile";
import { subscriptionReducer } from "@features/subscription";

export const rootReducer = combineReducers({
  article: articleReducer,
  attachedPosts: attachedPostsReducer,
  auth: authReducer,
  category: categoryReducer,
  lastComments: lastCommentsReducer,
  news: newsReducer,
  profile: profileReducer,
  subscription: subscriptionReducer,
  entities: entitiesReducer,
});

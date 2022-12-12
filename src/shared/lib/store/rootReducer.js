import { combineReducers } from "@reduxjs/toolkit";

import { articleReducer } from "@features/article";
import { attachedPostsReducer } from "@features/attachedPosts";
import { entitiesReducer } from "@features/entities";
import { lastCommentsReducer } from "@features/lastComments";
import { newsReducer } from "@features/news";
import { subscriptionReducer } from "@features/subscription";

export const rootReducer = combineReducers({
  article: articleReducer,
  attachedPosts: attachedPostsReducer,
  lastComments: lastCommentsReducer,
  news: newsReducer,
  subscription: subscriptionReducer,
  entities: entitiesReducer,
});

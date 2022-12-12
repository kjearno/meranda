import { combineReducers } from "@reduxjs/toolkit";

import articleReducer from "./articleSlice";
import commentsReducer from "./commentsSlice";

const reducer = combineReducers({
  data: articleReducer,
  comments: commentsReducer,
});

export { reducer as articleReducer };
export * from "./components";
export * from "./hooks";

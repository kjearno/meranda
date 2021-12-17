import { combineReducers } from "@reduxjs/toolkit";

import articleReducer from "./articleSlice";
import commentsReducer from "./commentsSlice";
import formReducer from "./formSlice";

export * from "./components";
export * from "./hooks";
export * from "./templates";

const reducer = combineReducers({
  data: articleReducer,
  comments: commentsReducer,
  form: formReducer,
});

export { reducer as articleReducer };

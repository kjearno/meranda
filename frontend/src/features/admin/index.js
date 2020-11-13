import { combineReducers } from "redux";
import { globalReducer } from "./modules/global";
import { resourcesReducer } from "./modules/resources";

export * from "./components";
export * from "./hooks";
export * from "./templates";

export const adminReducer = combineReducers({
  global: globalReducer,
  resources: resourcesReducer
});

export { globalOperations, globalSelectors } from "./modules/global";
export { resourcesOperations, resourcesSelectors } from "./modules/resources";

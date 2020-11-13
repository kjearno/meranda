import produce from "immer";
import * as types from "./types";

const initialState = {
  sidebarCollapsed:
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR_COLLAPSED:
      const toggledValue = !draft.sidebarCollapsed;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(toggledValue));
      draft.sidebarCollapsed = toggledValue;
      break;

    default:
      return draft;
  }
}, initialState);

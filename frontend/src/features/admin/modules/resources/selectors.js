import { createSelector } from "reselect";
import _, { isEqual } from "lodash-es";

export const everything = state => state.admin.resources;

export const current = state => everything(state).current;
export const selectedRowKeys = state => everything(state).selectedRowKeys;

export const isCurrentSetted = (state, props) => {
  const curr = current(state);

  return isEqual(props, curr);
};

export const resource = state => {
  const { resource } = current(state);

  return everything(state)[resource] || {};
};

export const items = createSelector(
  resource,

  ({ items }) => _.chain(items).values().reverse().value()
);

export const pagination = state => resource(state).pagination;

export const item = createSelector(
  current,
  items,

  (current, items) => {
    const itemId = parseInt(current.item);

    return items.find(item => item.id === itemId);
  }
);

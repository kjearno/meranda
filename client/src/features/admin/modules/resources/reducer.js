import produce from "immer";
import { mapKeys, omit } from "lodash-es";
import queryString from "query-string";
import { message } from "antd";
import { history } from "@lib/routing";
import * as selectors from "./selectors";
import * as types from "./types";

const MESSAGE_KEYS = { deleteItem: "deleteItem", deleteItems: "deleteItems" };

const initialState = {
  current: {
    resource: "",
    item: null
  },
  error: null,
  creating: false,
  editing: false,
  deleting: false,
  selectedRowKeys: [],
  relations: {}
};

export const reducer = produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.SET_CURRENT:
      draft.current = payload;
      break;

    case types.FETCH_RESOURCE_REQUEST:
      draft.error = null;
      draft[payload] = { loading: true };
      draft.selectedRowKeys = [];
      break;

    case types.FETCH_RESOURCE_SUCCESS:
      const { page = 1, limit = 10 } = queryString.parse(
        history.location.search,
        { parseNumbers: true }
      );

      draft[payload.name] = {
        items: mapKeys(payload.data.rows, "id"),
        pagination: {
          current: page,
          pageSize: limit,
          total: payload.data.count
        },
        loading: false
      };
      break;

    case types.FETCH_ITEM_REQUEST:
      draft.error = null;
      draft[payload] = {
        items: {},
        loading: true
      };
      break;

    case types.FETCH_ITEM_SUCCESS: {
      const { resourceName, item } = payload;
      draft[resourceName].items[item.id] = item;
      draft[resourceName].loading = false;
      break;
    }

    case types.FETCH_ITEM_FAILURE: {
      const { resource } = selectors.current({
        admin: { resources: draft }
      });

      draft.error = payload;
      draft[resource].loading = false;
      break;
    }

    case types.CREATE_ITEM_REQUEST:
      draft.creating = true;
      break;

    case types.CREATE_ITEM_SUCCESS:
    case types.CREATE_ITEM_FAILURE:
      draft.creating = false;
      break;

    case types.EDIT_ITEM_REQUEST:
      draft.editing = true;
      break;

    case types.EDIT_ITEM_SUCCESS: {
      const { resourceName, item } = payload;
      draft[resourceName].items[item.id] = item;
      draft.editing = false;
      break;
    }

    case types.EDIT_ITEM_FAILURE:
      draft.editing = false;
      break;

    case types.DELETE_ITEM_REQUEST: {
      message.loading({ content: "Deleting..", key: MESSAGE_KEYS.deleteItem });

      const { resourceName, id } = payload;
      draft[resourceName].items = omit(draft[resourceName].items, id);
      draft[resourceName].pagination.total = --draft[resourceName].pagination
        .total;
      break;
    }

    case types.DELETE_ITEM_SUCCESS:
      message.success({ content: "Success", key: MESSAGE_KEYS.deleteItem });
      break;

    case types.DELETE_ITEMS_REQUEST: {
      message.loading({ content: "Deleting..", key: MESSAGE_KEYS.deleteItems });

      const { resourceName, ids } = payload;

      draft[resourceName].items = omit(draft[resourceName].items, ids);
      draft[resourceName].pagination.total =
        draft[resourceName].pagination.total - ids.length;
      draft.selectedRowKeys = [];
      draft.deleting = true;
      break;
    }

    case types.DELETE_ITEMS_SUCCESS:
      message.success({ content: "Success", key: MESSAGE_KEYS.deleteItems });

      draft.deleting = false;
      break;

    case types.FETCH_RELATION_REQUEST:
      draft.relations[payload] = { loading: true };
      break;

    case types.FETCH_RELATION_SUCCESS:
      draft.relations[payload.relationName] = {
        data: payload.data,
        loading: false
      };
      break;

    case types.SET_SELECTED_ROW_KEYS:
      draft.selectedRowKeys = payload;
      break;

    default:
      return draft;
  }
}, initialState);

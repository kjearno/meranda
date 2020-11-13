import { message } from "antd";
import { axios } from "@lib/axios";
import { history } from "@lib/routing";
import { cleanItems } from "../../lib/clean-items";
import { handleError } from "../../lib/errors";
import * as actions from "./actions";
import * as selectors from "./selectors";

export const fetchResource = name => {
  return async (dispatch, getState) => {
    const current = { resource: name, item: null };

    const isCurrentSetted = selectors.isCurrentSetted(getState(), current);

    if (!isCurrentSetted) {
      dispatch(actions.setCurrent(current));
    }

    const resource = selectors.resource(getState());
    if (resource.loading) return;

    dispatch(actions.fetchResourceRequest(name));

    const { search } = history.location;
    const res = await axios.get(name + search);

    dispatch(actions.fetchResourceSuccess({ name, data: res.data }));
  };
};

export const fetchItem = (resourceName, id) => {
  return async (dispatch, getState) => {
    const current = { resource: resourceName, item: id };

    const isCurrentSetted = selectors.isCurrentSetted(getState(), current);

    if (!isCurrentSetted) {
      dispatch(actions.setCurrent(current));
    }

    const item = selectors.item(getState());
    if (item) return;

    dispatch(actions.fetchItemRequest(resourceName));

    try {
      const res = await axios.get(`/${resourceName}/${id}`);

      dispatch(actions.fetchItemSuccess({ resourceName, item: res.data }));
    } catch (err) {
      handleError(actions.fetchItemFailure, { err, showMessages: false });
    }
  };
};

export const createItem = ({ formData, setTouchedValues }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.createItemRequest());

      const { resource: resourceName } = selectors.current(getState());

      await axios.post(`/${resourceName}`, formData);

      dispatch(actions.createItemSuccess());
      setTouchedValues({});
      history.push(`/admin/${resourceName}`);
    } catch (err) {
      handleError(actions.createItemFailure, { err });
    }
  };
};

export const editItem = ({ formData, setTouchedValues }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.editItemRequest());

      const { resource: resourceName, item: id } = selectors.current(
        getState()
      );

      const res = await axios.patch(`/${resourceName}/${id}`, formData);

      dispatch(actions.editItemSuccess({ resourceName, item: res.data }));
      setTouchedValues({});
      message.success("Success");
    } catch (err) {
      handleError(actions.editItemFailure, { err });
    }
  };
};

export const deleteItem = (resourceName, id) => {
  return async (dispatch, getState) => {
    const pagination = selectors.pagination(getState());

    dispatch(actions.deleteItemRequest({ resourceName, id }));

    await axios.delete(`/${resourceName}/${id}`);

    cleanItems({
      dispatch,
      getState,
      resourceName,
      pagination,
      onSuccess: actions.deleteItemSuccess
    });
  };
};

export const deleteItems = resourceName => {
  return async (dispatch, getState) => {
    const ids = selectors.selectedRowKeys(getState());
    const pagination = selectors.pagination(getState());

    dispatch(actions.deleteItemsRequest({ resourceName, ids }));

    await axios.delete(`/${resourceName}?ids=${JSON.stringify(ids)}`);

    cleanItems({
      dispatch,
      getState,
      resourceName,
      pagination,
      onSuccess: actions.deleteItemsSuccess
    });
  };
};

export const fetchRelations = names => {
  return dispatch => {
    names.forEach(item => dispatch(fetchRelation(item)));
  };
};

const fetchRelation = name => {
  return async dispatch => {
    dispatch(actions.fetchRelationRequest(name));

    const res = await axios.get(`/${name}?limit=100`);

    const relations = res.data.rows.map(item => ({
      label: item.name,
      value: item.id
    }));

    dispatch(
      actions.fetchRelationSuccess({ relationName: name, data: relations })
    );
  };
};

export const setSelectedRowKeys = actions.setSelectedRowKeys;

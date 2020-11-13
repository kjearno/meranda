import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import queryString from "query-string";

import { DeviceContext } from "@features/shared";
import { history } from "@lib/routing";
import {
  resourcesOperations,
  resourcesSelectors
} from "../../../modules/resources";
import { rawColumns, getColumns } from "./columns";

export const useResourceList = () => {
  const dispatch = useDispatch();
  const { resource: resourceName } = useParams();

  const isMobile = useContext(DeviceContext);

  const { search } = history.location;

  const { deleting, selectedRowKeys } = useSelector(
    resourcesSelectors.everything
  );

  const { loading, pagination } = useSelector(resourcesSelectors.resource);
  const items = useSelector(resourcesSelectors.items);

  useEffect(() => {
    const isResourceExist = !!rawColumns[resourceName];

    if (isResourceExist) {
      dispatch(resourcesOperations.fetchResource(resourceName));
    }
  }, [dispatch, resourceName, search]);

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      dispatch(resourcesOperations.setSelectedRowKeys(selectedRowKeys));
    }
  };

  const handleChange = pagination => {
    const search = queryString.stringify({
      page: pagination.current,
      limit: pagination.pageSize
    });

    history.push({
      pathname: history.location.pathname,
      search
    });
  };

  const handleItemDelete = id => {
    dispatch(resourcesOperations.deleteItem(resourceName, id));
  };

  const handleItemsDelete = () => {
    dispatch(resourcesOperations.deleteItems(resourceName));
  };

  return {
    columns: getColumns({ resourceName, handleItemDelete }),
    items,
    isLoading: loading,
    isDeleting: deleting,
    selectedRowKeys,
    rowSelection,
    hasSelected: selectedRowKeys.length > 0,
    pagination: {
      ...pagination,
      responsive: isMobile,
      showLessItems: isMobile
    },
    onChange: handleChange,
    onItemsDelete: handleItemsDelete
  };
};

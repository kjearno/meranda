import { history } from "@lib/routing";
import {
  resourcesOperations,
  resourcesSelectors
} from "../../modules/resources";

export const cleanItems = async ({
  dispatch,
  getState,
  resourceName,
  pagination,
  onSuccess
}) => {
  const { current, pageSize, total } = pagination;

  const items = resourcesSelectors.items(getState());

  const hasItems = !!Object.keys(items).length;
  const hasNextPage = Math.ceil(total / pageSize) > current;

  if (hasItems) {
    if (hasNextPage) {
      await dispatch(resourcesOperations.fetchResource(resourceName));
    }

    dispatch(onSuccess());
    return;
  }

  if (hasNextPage) {
    await dispatch(resourcesOperations.fetchResource(resourceName));
  } else {
    const page = current !== 1 ? current - 1 : current;
    history.push(`/admin/${resourceName}?page=${page}`);
  }

  dispatch(onSuccess());
};

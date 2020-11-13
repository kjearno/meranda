import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useResourceList } from "@features/admin";
import { useResourceCreate } from "@features/admin";
import { history } from "@lib/routing";
import styles from "./Actions.module.scss";

export const Actions = () => {
  const {
    isDeleting,
    selectedRowKeys,
    hasSelected,
    onItemsDelete
  } = useResourceList();

  const { inputs } = useResourceCreate();

  return (
    <div className={styles.actions}>
      <div className={styles.buttons}>
        {hasSelected && (
          <Button type="primary" loading={isDeleting} onClick={onItemsDelete}>
            Delete
          </Button>
        )}
        {inputs && (
          <Link
            className={styles.create}
            to={`${history.location.pathname}/create`}
          >
            <Button>Create</Button>
          </Link>
        )}
      </div>

      <div className={styles.counter}>
        {hasSelected && (
          <span>{`Selected ${selectedRowKeys.length} items`}</span>
        )}
      </div>
    </div>
  );
};

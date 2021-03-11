import React, { useContext } from "react";
import RcPagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { DeviceContext } from "@features/shared";
import styles from "./Pagination.module.scss";

export const Pagination = props => {
  const isMobile = useContext(DeviceContext);

  return (
    <RcPagination
      className={styles.pagination}
      showLessItems={isMobile}
      {...props}
    />
  );
};

import React, { useContext } from "react";
import PropTypes from "prop-types";
import RcPagination from "rc-pagination";
import locale from "rc-pagination/es/locale/en_US";
import { DeviceContext } from "@shared/context";
import styles from "./style.module.scss";
import "rc-pagination/assets/index.css";

export function Pagination({ current, pageSize, total, onChange }) {
  const isMobile = useContext(DeviceContext);

  return (
    <RcPagination
      className={styles.pagination}
      locale={locale}
      showLessItems={isMobile}
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
    />
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

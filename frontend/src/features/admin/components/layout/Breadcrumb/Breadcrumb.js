import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { useBreadcrumbs } from "../../../hooks";
import styles from "./Breadcrumb.module.scss";

export const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <AntBreadcrumb className={styles.breadcrumb}>
      <AntBreadcrumb.Item>Dashboard</AntBreadcrumb.Item>

      {breadcrumbs.map(item => (
        <AntBreadcrumb.Item key={item}>{item}</AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
  );
};

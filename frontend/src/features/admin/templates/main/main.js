import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

import { DeviceProvider } from "@features/shared";
import { Sidebar, Header, Breadcrumb, Footer } from "../../components";
import { useCheckAccess } from "../../hooks";
import styles from "./main.module.scss";

const { Content } = Layout;

export const AdminTemplate = ({ children }) => {
  useCheckAccess();

  return (
    <Layout className={styles.layout}>
      <DeviceProvider>
        <Sidebar />
        <Layout className={`site-layout ${styles.main}`}>
          <Header />

          <Content className={styles.content}>
            <Breadcrumb />
            <div className={`site-layout-background ${styles.children}`}>
              {children}
            </div>
          </Content>

          <Footer />
        </Layout>
      </DeviceProvider>
    </Layout>
  );
};

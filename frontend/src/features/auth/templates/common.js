import React from "react";

import { Grid, Row, Col } from "react-flexbox-grid";
import { Sidebar } from "@features/shared";
import { MainTemplate } from "@ui/templates";
import styles from "./common.module.scss";

export const AuthTemplate = ({ children }) => (
  <MainTemplate>
    <div className={styles.wrapper}>
      <Grid>
        <Row>
          <Col lg={9}>
            <div className={styles.children}>{children}</div>
          </Col>

          <Col lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </div>
  </MainTemplate>
);

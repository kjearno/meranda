import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Sidebar } from "@features/shared";
import { Section } from "@ui/components";
import { MainTemplate } from "@ui/templates";

export const ProfileTemplate = ({ children }) => (
  <MainTemplate>
    <Section>
      <Grid>
        <Row>
          <Col lg={8}>{children}</Col>

          <Col lg={3} lgOffset={1}>
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </Section>
  </MainTemplate>
);

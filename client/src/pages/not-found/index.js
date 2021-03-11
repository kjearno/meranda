import React from "react";

import { Grid, Row, Col } from "react-flexbox-grid";
import { Sidebar } from "@features/shared";
import { Section, NotFound } from "@ui/components";
import { MainTemplate } from "@ui/templates";

export const NotFoundPage = () => (
  <MainTemplate>
    <Section>
      <Grid>
        <Row>
          <Col lg={9}>
            <NotFound />
          </Col>

          <Col lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </Section>
  </MainTemplate>
);

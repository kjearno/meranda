import PropTypes from "prop-types";
import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Section, Sidebar } from "@shared/components";
import { MainTemplate } from "./MainTemplate";

export function CommonTemplate({ children }) {
  return (
    <MainTemplate>
      <Section>
        <Grid>
          <Row>
            <Col lg={9}>
              <main>{children}</main>
            </Col>

            <Col lg={3}>
              <Sidebar />
            </Col>
          </Row>
        </Grid>
      </Section>
    </MainTemplate>
  );
}

CommonTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

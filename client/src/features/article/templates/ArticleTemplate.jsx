import PropTypes from "prop-types";
import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Section, Sidebar } from "@shared/components";
import { MainTemplate } from "@shared/templates";

export function ArticleTemplate({ children }) {
  return (
    <MainTemplate>
      <Section>
        <Grid>
          <Row>
            <Col lg={8}>
              <main>{children}</main>
            </Col>

            <Col lg={3} lgOffset={1}>
              <Sidebar />
            </Col>
          </Row>
        </Grid>
      </Section>
    </MainTemplate>
  );
}

ArticleTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

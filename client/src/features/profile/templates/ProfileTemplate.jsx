import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Section, Sidebar } from "@shared/components";
import { MainTemplate } from "@shared/templates";

export function ProfileTemplate({ children }) {
  return (
    <MainTemplate>
      <Section>
        <Grid>
          <Row>
            <Col lg={7}>
              <main>{children}</main>
            </Col>

            <Col lg={3} lgOffset={2}>
              <Sidebar />
            </Col>
          </Row>
        </Grid>
      </Section>
    </MainTemplate>
  );
}

ProfileTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

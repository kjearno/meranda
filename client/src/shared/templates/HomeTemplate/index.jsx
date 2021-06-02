import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Section, Sidebar } from "@shared/components";
import { MainTemplate } from "../MainTemplate";
import styles from "./style.module.scss";

export function HomeTemplate({ carousel, children }) {
  return (
    <MainTemplate>
      <Section className={styles.carousel}>
        <Grid>{carousel}</Grid>
      </Section>

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

HomeTemplate.propTypes = {
  carousel: PropTypes.element.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

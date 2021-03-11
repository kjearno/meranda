import React from "react";
import { Helmet } from "react-helmet";

import { Grid, Row, Col } from "react-flexbox-grid";
import { useAttachedPosts, News } from "@features/posts";
import { Sidebar } from "@features/shared";
import { Carousel, Section } from "@ui/components";
import { MainTemplate } from "@ui/templates";
import styles from "./index.module.scss";

export const HomePage = () => {
  const { items, isLoading } = useAttachedPosts();

  return (
    <>
      <Helmet title="Home" />

      <MainTemplate>
        <Section className={styles.hero}>
          <Grid>
            <Carousel isLoading={isLoading} items={items} />
          </Grid>
        </Section>

        <Section>
          <Grid>
            <Row>
              <Col lg={9}>
                <News />
              </Col>
              <Col lg={3}>
                <Sidebar />
              </Col>
            </Row>
          </Grid>
        </Section>
      </MainTemplate>
    </>
  );
};

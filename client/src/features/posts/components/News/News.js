import React from "react";
import { useNews } from "../../hooks";

import { Row, Col } from "react-flexbox-grid";
import { Loading, MetaCategory, PostItem } from "@features/shared";
import { Pagination, SectionTitle } from "@ui/components";
import styles from "./News.module.scss";

export const News = () => {
  const { items, isLoading, pagination } = useNews();

  const posts = isLoading ? (
    <Loading n={2} />
  ) : (
    items?.map(item => (
      <PostItem
        key={item.id}
        post={item}
        metaCategory={<MetaCategory category={item.category} />}
      />
    ))
  );

  return (
    <>
      <SectionTitle>Recent News</SectionTitle>

      {posts}

      <Row>
        <Col lg={6}>
          <div className={styles.pagination}>
            <Pagination {...pagination} />
          </div>
        </Col>
      </Row>
    </>
  );
};

import React from "react";

import { PostItem, Loading } from "@features/shared";
import { SectionTitle, Error, Pagination } from "@ui/components";
import { useCategory } from "../../hooks";
import styles from "./Category.module.scss";

export const Category = () => {
  const {
    category,
    error,
    isLoading,
    posts,
    noRecords,
    pagination
  } = useCategory();

  if (error) {
    return <Error error={error} />;
  }

  const records = isLoading ? (
    <Loading n={5} />
  ) : (
    posts.map(post => <PostItem key={post.id} post={post} />)
  );

  return (
    <>
      <SectionTitle caption="Category">{category.name}</SectionTitle>

      {noRecords ? (
        <p>No Records</p>
      ) : (
        <>
          {records}
          <div className={styles.pagination}>
            <Pagination {...pagination} />
          </div>
        </>
      )}
    </>
  );
};

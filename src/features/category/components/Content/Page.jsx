import React from "react";

import { Post } from "@features/entities";
import { Pagination } from "@shared/components";
import { usePage } from "../../hooks";
import styles from "./Page.module.scss";

export function Page() {
  const {
    posts,
    isLoading,
    error,
    current,
    pageSize,
    total,
    onChange,
  } = usePage();

  let content = posts.map((post) => (
    <Post
      key={post.id}
      title={post.title}
      description={post.description}
      slug={post.slug}
      photo={post.photo}
      createdAt={post.createdAt}
      categoryId={post.categoryId}
      userId={post.userId}
    />
  ));

  if (!total) {
    content = <p>No posts</p>;
  }

  if (isLoading) {
    content = <Post.Loader n={5} />;
  }

  if (error) {
    content = <p>{error.message}</p>;
  }

  return (
    <>
      {content}

      {total ? (
        <div className={styles.pagination}>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
          />
        </div>
      ) : null}
    </>
  );
}

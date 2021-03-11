import React from "react";
import { Link } from "react-router-dom";

import { NoPostPhoto } from "@ui/assets";
import styles from "./PostItem.module.scss";

export const PostItem = ({ post, metaCategory }) => {
  const {
    title,
    description,
    slug,
    thumbnail,
    createdAt,
    user,
    category
  } = post;

  const postPhoto = thumbnail ? thumbnail : NoPostPhoto;

  return (
    <article className={styles.box}>
      <div className={styles.thumbnail}>
        <Link to={`/${category.slug}/${slug}`}>
          <div className={styles.thumbnailInner}>
            <div
              className={styles.thumbnailImage}
              style={{
                backgroundImage: `url(${postPhoto})`
              }}
            />
          </div>
        </Link>
      </div>

      <section className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/${category.slug}/${slug}`}>{title}</Link>
        </h2>

        <p className={styles.description}>{description}</p>

        <footer className={styles.meta}>
          <div>
            <span className={styles.author}>{user.username}</span>{" "}
            {metaCategory}
          </div>
          <div className={styles.date}>{createdAt}</div>
        </footer>
      </section>
    </article>
  );
};

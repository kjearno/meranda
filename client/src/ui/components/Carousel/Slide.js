import React from "react";
import { Link } from "react-router-dom";
import { NoPostPhoto } from "@ui/assets";
import styles from "./Slide.module.scss";

export const Slide = ({ post }) => {
  const {
    title,
    slug,
    description,
    thumbnail,
    createdAt,
    user,
    category
  } = post;

  const postPhoto = thumbnail ? thumbnail : NoPostPhoto;

  return (
    <article className={styles.screen}>
      <div className={styles.thumbnail}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${postPhoto})` }}
        />
      </div>

      <section className={styles.content}>
        <header>
          <div className={styles.caption}>Editor's Pick</div>
          <h2 className={styles.title}>
            <Link to={`/${category.slug}/${slug}`}>{title}</Link>
          </h2>
        </header>

        <p className={styles.description}>{description}</p>

        <footer>
          <div className={styles.meta}>
            <p className={styles.info}>
              {user.username} | <Link to={category.slug}>{category.name}</Link>
            </p>
            <span className={styles.date}>{createdAt}</span>
          </div>
        </footer>
      </section>
    </article>
  );
};

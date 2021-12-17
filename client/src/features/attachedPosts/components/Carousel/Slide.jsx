import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { usePost } from "@features/entities";
import { noPostPhoto } from "@shared/assets";
import styles from "./Slide.module.scss";

export function Slide({
  title,
  slug,
  description,
  photo,
  createdAt,
  categoryId,
  userId,
}) {
  const { author, categoryName, categorySlug } = usePost({
    categoryId,
    userId,
  });

  return (
    <article className={styles.slide}>
      <div className={styles.photo}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${photo || noPostPhoto})` }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.caption}>Editor&apos;s Pick</div>
        <h5 className={styles.title}>
          <Link to={`/${categorySlug}/${slug}`}>{title}</Link>
        </h5>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <p className={styles.info}>
            {author} in <Link to={categorySlug}>{categoryName}</Link>
          </p>
          <span className={styles.date}>{createdAt}</span>
        </div>
      </div>
    </article>
  );
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

Slide.defaultProps = {
  photo: null,
};

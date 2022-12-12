import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { noPostPhoto } from "@assets";
import { usePost } from "@features/entities";
import styles from "./Slide.module.scss";

export function Slide({ title, slug, description, photo, createdAt, userId }) {
  const { author } = usePost({
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
          <Link to={`/${slug}`}>{title}</Link>
        </h5>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <p className={styles.info}>by {author}</p>
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
  userId: PropTypes.number.isRequired,
};

Slide.defaultProps = {
  photo: null,
};

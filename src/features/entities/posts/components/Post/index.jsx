import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { noPostPhoto } from "@assets";
import { usePost } from "../../hooks";
import { Loader } from "./Loader";
import styles from "./Post.module.scss";

export function Post({ title, description, slug, photo, createdAt, userId }) {
  const { author } = usePost({
    userId,
  });

  return (
    <article className={styles.post}>
      <div className={styles.photo}>
        <Link to={`/${slug}`}>
          <img src={photo || noPostPhoto} alt="" />
        </Link>
      </div>

      <div className={styles.content}>
        <h5 className={styles.title}>
          <Link to={`/${slug}`}>{title}</Link>
        </h5>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <p className={styles.info}>
            by <span>{author}</span>
          </p>
          <p className={styles.date}>{createdAt}</p>
        </div>
      </div>
    </article>
  );
}

Post.Loader = Loader;

Post.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  photo: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

Post.defaultProps = {
  photo: null,
};

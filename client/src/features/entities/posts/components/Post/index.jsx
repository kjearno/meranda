import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { noPostPhoto } from "@shared/assets";
import { usePost } from "../../hooks";
import { Loader } from "./Loader";
import { MetaCategory } from "./MetaCategory";
import styles from "./Post.module.scss";

export function Post({
  title,
  description,
  slug,
  photo,
  createdAt,
  categoryId,
  userId,
  metaCategory,
}) {
  const { author, categoryName, categorySlug } = usePost({
    categoryId,
    userId,
  });

  return (
    <article className={styles.post}>
      <div className={styles.photo}>
        <Link to={`/${categorySlug}/${slug}`}>
          <img src={photo || noPostPhoto} alt="" />
        </Link>
      </div>

      <div className={styles.content}>
        <h5 className={styles.title}>
          <Link to={`/${categorySlug}/${slug}`}>{title}</Link>
        </h5>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <p className={styles.info}>
            <span>{author}</span>
            {metaCategory && (
              <MetaCategory name={categoryName} slug={categorySlug} />
            )}
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
  categoryId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  metaCategory: PropTypes.bool,
};

Post.defaultProps = {
  photo: null,
  metaCategory: false,
};

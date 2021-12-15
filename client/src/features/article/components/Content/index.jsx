import React from "react";
import { Link } from "react-router-dom";

import { NoPostPhoto } from "@shared/assets";
import { Error, Loader } from "@shared/components";
import { useArticle } from "../../hooks";
import { AuthorPhoto } from "./AuthorPhoto";
import { Comments } from "./Comments";
import styles from "./Content.module.scss";

export function Content() {
  const { article, category, user, isLoading, error } = useArticle();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const photo = article.photo || NoPostPhoto;

  return (
    <article className={styles.article}>
      <header>
        <div className={styles.photo}>
          <img src={photo} alt="" />
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>
          <AuthorPhoto photo={user.photo} />
          <div>
            <p className={styles.info}>
              {user.username} in{" "}
              <Link to={`/${category.slug}`}>{category.name}</Link>
            </p>
            <p className={styles.date}>{article.createdAt}</p>
          </div>
        </div>
      </header>

      <section className={styles.text}>{article.text}</section>

      <Comments articleId={article.id} />
    </article>
  );
}

import React from "react";

import { noPostPhoto } from "@assets";
import { Error } from "@components/errors";
import { Loader } from "@components/Loader";
import { Comments } from "../Comments";
import { useArticle } from "../../hooks";
import { AuthorPhoto } from "./AuthorPhoto";
import styles from "./Content.module.scss";

export function Content() {
  const { article, user, isLoading, error } = useArticle();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const photo = article.photo || noPostPhoto;

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
            <p className={styles.info}>by {user.username}</p>
            <p className={styles.date}>{article.createdAt}</p>
          </div>
        </div>
      </header>

      <section className={styles.text}>{article.text}</section>

      <Comments articleId={article.id} />
    </article>
  );
}

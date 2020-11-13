import React from "react";
import { Link } from "react-router-dom";

import { usePost } from "../../hooks";
import { NoPostPhoto } from "@ui/assets";
import { Loading, Error } from "@ui/components";
import { AuthorPhoto } from "./AuthorPhoto";
import { Comments } from "./Comments";
import styles from "./Post.module.scss";

export const Post = () => {
  const { post, isLoading, error } = usePost();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const photo = post.photo ? post.photo : NoPostPhoto;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.photo}>
          <img src={`${photo}`} alt="" />
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <AuthorPhoto src={post.user.photo} />

          <div>
            <div>
              {post.user.username} |{" "}
              <Link to={`/${post.category.slug}`}>{post.category.name}</Link>
            </div>
            <div className={styles.date}>{post.createdAt}</div>
          </div>
        </div>
      </header>

      <section className={styles.text}>{post.text}</section>

      <Comments comments={post.comments} postId={post.id} />
    </article>
  );
};

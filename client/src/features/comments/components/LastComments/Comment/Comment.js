import React from "react";
import { Link } from "react-router-dom";
import styles from "./Comment.module.scss";

export const Comment = ({ date, number, post, text, user }) => (
  <div className={styles.entry}>
    <div className={styles.number}>{number}</div>

    <div className={styles.body}>
      <p className={styles.text}>{text}</p>

      <div className={styles.meta}>
        <div>
          {user.username} in{" "}
          <Link to={`/${post.category.slug}/${post.slug}`}>{post.title}</Link>
        </div>
        <div>{date}</div>
      </div>
    </div>
  </div>
);

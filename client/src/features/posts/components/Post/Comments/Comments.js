import React from "react";
import { SectionTitle } from "@ui/components";
import { Avatar } from "./Avatar";
import { CommentForm } from "./CommentForm";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, postId }) => {
  const commentList = comments.map(comment => (
    <li className={styles.comment} key={comment.id}>
      <Avatar src={comment.user.photo} />

      <div className={styles.content}>
        <div className={styles.meta}>
          <h3 className={styles.author}>{comment.user.username}</h3>
          <div className={styles.date}>{comment.createdAt}</div>
        </div>

        <div className={styles.text}>{comment.text}</div>
      </div>
    </li>
  ));

  return (
    <section className={styles.box}>
      <SectionTitle>Comments: {commentList.length}</SectionTitle>

      <ul className={styles.commentList}>{commentList}</ul>

      <CommentForm postId={postId} />
    </section>
  );
};

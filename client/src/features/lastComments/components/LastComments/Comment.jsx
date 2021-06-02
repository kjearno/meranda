import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLastComment } from "../../hooks";
import styles from "./Comment.module.scss";

export function Comment({ number, text, date, postId, userId }) {
  const { articleSlug, articleTitle, username } = useLastComment({
    postId,
    userId,
  });

  return (
    <div className={styles.comment}>
      <div className={styles.number}>{number}</div>

      <div className={styles.body}>
        <p className={styles.text}>{text}</p>
        <div className={styles.meta}>
          <p className={styles.author}>
            {username} in <Link to={articleSlug}>{articleTitle}</Link>
          </p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

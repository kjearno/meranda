import React from "react";
import PropTypes from "prop-types";
import { NoUserPhoto } from "@shared/assets";
import { useComment } from "../../../hooks";
import styles from "./Comment.module.scss";

export function Comment({ text, createdAt, userId }) {
  const { username, photo } = useComment(userId);

  return (
    <li className={styles.comment}>
      <div className={styles.photo}>
        <img src={photo || NoUserPhoto} alt="" />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <h5 className={styles.author}>{username}</h5>
          <p className={styles.date}>{createdAt}</p>
        </div>

        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

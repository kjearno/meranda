import PropTypes from "prop-types";
import React from "react";

import { noUserPhoto } from "@assets";
import { useComment } from "../../hooks";
import styles from "./Item.module.scss";

export function Item({ text, createdAt, userId }) {
  const { username, photo } = useComment({ userId });

  return (
    <li className={styles.comment}>
      <div className={styles.photo}>
        <img src={photo || noUserPhoto} alt="" />
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

Item.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

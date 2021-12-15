import PropTypes from "prop-types";
import React from "react";

import { Loader, Section } from "@shared/components";
import { useComments } from "../../../hooks";
import { Item } from "./Item";
import { Form } from "./Form";
import styles from "./Comments.module.scss";

export function Comments({ articleId }) {
  const { comments, isLoading } = useComments(articleId);

  const list = comments.map((comment) => (
    <Item
      key={comment.id}
      text={comment.text}
      createdAt={comment.createdAt}
      userId={comment.userId}
    />
  ));

  let content = (
    <>
      <Section.Title>Comments: {list.length}</Section.Title>
      <ul className={styles.list}>{list}</ul>
      <Form />
    </>
  );

  if (isLoading) {
    content = <Loader size={35} />;
  }

  return <section className={styles.comments}>{content}</section>;
}

Comments.propTypes = {
  articleId: PropTypes.number.isRequired,
};

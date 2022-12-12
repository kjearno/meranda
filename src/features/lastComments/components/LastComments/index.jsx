import React from "react";

import { Section } from "@components/Section";
import { useLastComments } from "../../hooks";
import { Comment } from "./Comment";
import { Loader } from "./Loader";

export function LastComments() {
  const { comments, isLoading } = useLastComments();

  let content = comments.length
    ? comments.map((comment, index) => (
        <Comment
          key={comment.id}
          number={index + 1}
          text={comment.text}
          date={comment.createdAt}
          postId={comment.postId}
          userId={comment.userId}
        />
      ))
    : "No recent comments";

  if (isLoading) {
    content = <Loader n={5} />;
  }

  return (
    <>
      <Section.Title>Last Comments</Section.Title>
      {content}
    </>
  );
}

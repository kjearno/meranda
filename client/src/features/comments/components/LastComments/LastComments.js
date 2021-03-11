import React from "react";
import { useLastComments } from "@features/comments";

import { SectionTitle } from "@ui/components";
import { Comment } from "./Comment";
import { Loading } from "./Loading";

export const LastComments = () => {
  const { items, isLoading } = useLastComments();

  return (
    <>
      <SectionTitle>Last comments</SectionTitle>

      {isLoading ? (
        <Loading />
      ) : items.length ? (
        items.map((comment, index) => (
          <Comment
            date={comment.createdAt}
            key={comment.id}
            number={index + 1}
            post={comment.post}
            text={comment.text}
            user={comment.user}
          />
        ))
      ) : (
        "No recent comments"
      )}
    </>
  );
};

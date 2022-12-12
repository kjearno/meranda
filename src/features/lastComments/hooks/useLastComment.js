import { useSelector } from "react-redux";

import { selectPostById } from "@features/entities";
import { selectUserById } from "@shared/entities";

export const useLastComment = ({ postId, userId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const user = useSelector((state) => selectUserById(state, userId));

  return {
    articleSlug: `/${post.slug}`,
    articleTitle: post.title,
    username: user.username,
  };
};

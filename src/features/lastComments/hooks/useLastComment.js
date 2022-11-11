import { useSelector } from "react-redux";
import { selectPostById } from "@features/entities";
import { selectCategoryById, selectUserById } from "@shared/entities";

export const useLastComment = ({ postId, userId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const user = useSelector((state) => selectUserById(state, userId));
  const category = useSelector((state) =>
    selectCategoryById(state, post.categoryId)
  );

  return {
    articleSlug: `/${category.slug}/${post.slug}`,
    articleTitle: post.title,
    username: user.username,
  };
};

import { useSelector } from "react-redux";
import { selectCategoryById, selectUserById } from "@shared/entities";

export const usePost = ({ categoryId, userId }) => {
  const category = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );
  const user = useSelector((state) => selectUserById(state, userId));

  return {
    categorySlug: category.slug,
    categoryName: category.name,
    author: user.username,
  };
};

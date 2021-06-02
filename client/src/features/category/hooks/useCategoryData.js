import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategory } from "../store";

export const useCategoryData = () => {
  const { categorySlug } = useParams();

  const category = useSelector((state) => selectCategory(state, categorySlug));

  return category;
};

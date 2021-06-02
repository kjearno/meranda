import { schema } from "normalizr";
import { categoryEntity } from "../categories";
import { userEntity } from "../users";

export const postEntity = new schema.Entity("posts", {
  category: categoryEntity,
  user: userEntity,
});

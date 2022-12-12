import { schema } from "normalizr";

import { postEntity } from "../posts";
import { userEntity } from "../users";

export const commentEntity = new schema.Entity("comments", {
  post: postEntity,
  user: userEntity,
});

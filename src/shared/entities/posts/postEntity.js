import { schema } from "normalizr";

import { userEntity } from "../users";

export const postEntity = new schema.Entity("posts", {
  user: userEntity,
});

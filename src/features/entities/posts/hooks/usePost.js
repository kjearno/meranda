import { useSelector } from "react-redux";

import { selectUserById } from "@shared/entities";

export const usePost = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  return {
    author: user.username,
  };
};

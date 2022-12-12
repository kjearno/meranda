import { useSelector } from "react-redux";

import { selectUserById } from "@shared/entities";

export const useComment = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  return {
    username: user.username,
    photo: user.photo,
  };
};

import { useDispatch, useSelector } from "react-redux";

import { LOADING_STATUS } from "@shared/constants";
import { selectStatus, sendComment } from "../formSlice";
import { useArticleData } from "./useArticleData";

export const useForm = () => {
  const dispatch = useDispatch();
  const article = useArticleData();

  const status = useSelector(selectStatus);

  const handleCommentSend = (values, actions) => {
    const data = {
      ...values,
      postId: article.id,
    };

    dispatch(sendComment({ data, actions }));
  };

  return {
    isLoading: status === LOADING_STATUS,
    onCommentSend: handleCommentSend,
  };
};

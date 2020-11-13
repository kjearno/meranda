import { useDispatch, useSelector } from "react-redux";
import { commentsOperations, commentsSelectors } from "../modules/comments";

export const useComments = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(commentsSelectors.current);

  const handleCommentSend = (values, actions) => {
    dispatch(commentsOperations.sendComment(values, actions));
  };

  return {
    isLoading: loading,
    error,
    onCommentSend: handleCommentSend
  };
};

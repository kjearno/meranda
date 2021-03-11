import { axios } from "@lib/axios";
import { handleError } from "@lib/errors";
import * as actions from "./actions";

export const fetchLastComments = () => {
  return async dispatch => {
    dispatch(actions.fetchLastCommentsRequest());

    const res = await axios.get("/comments?limit=5");
    const comments = res.data.rows;
    dispatch(actions.fetchLastCommentsSuccess(comments));
  };
};

export const sendComment = (values, { resetForm }) => {
  return async dispatch => {
    dispatch(actions.sendCommentRequest());

    try {
      const res = await axios.post("/comments/me", values);
      dispatch(actions.sendCommentSuccess(res.data));
      resetForm();
    } catch (err) {
      handleError(actions.sendCommentFailure, { err });
    }
  };
};

import { toast } from "react-toastify";
import { axios } from "@lib/axios";
import { handleError } from "@lib/errors";
import * as actions from "./actions";

export const subscribe = values => {
  return async dispatch => {
    dispatch(actions.subscribeRequest());

    try {
      await axios.post("/subscribers", values);
      dispatch(actions.subscribeSuccess());
      toast.success("You have successfully subscribed");
    } catch (err) {
      handleError(actions.subscribeFailure, { err });
    }
  };
};

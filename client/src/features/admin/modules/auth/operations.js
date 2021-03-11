import { authActions, authOperations } from "@features/auth";
import { axios } from "@lib/axios";
import { handleError, ForbiddenError } from "../../lib/errors";

export const login = userData => {
  return async dispatch => {
    dispatch(authActions.authRequest());

    try {
      const res = await axios.post("/auth/login", userData);
      const user = res.data;

      if (!user.isAdmin) {
        throw new ForbiddenError("You are not an administrator");
      }

      dispatch(authActions.authSuccess(user));
    } catch (err) {
      await dispatch(authOperations.logout());

      handleError(authActions.authFailure, { err });
    }
  };
};

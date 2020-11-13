import { toast } from "react-toastify";
import { axios } from "@lib/axios";
import { handleError } from "@lib/errors";
import * as actions from "./actions";

export const updatePassword = (values, { resetForm }) => {
  return async dispatch => {
    dispatch(actions.updateProfileRequest());

    try {
      const res = await axios.patch("/users/me/password", values);
      dispatch(actions.updateProfileSuccess(res.data));
      resetForm();
      toast.success("Password changed successfully");
    } catch (err) {
      handleError(actions.updateProfileFailure, { err });
    }
  };
};

export const updatePhoto = values => {
  return async dispatch => {
    dispatch(actions.updateProfileRequest());

    try {
      const res = await axios.patch("/users/me/photo", values);
      dispatch(actions.updateProfileSuccess(res.data));
      toast.success("Photo changed successfully");
    } catch (err) {
      handleError(actions.updateProfileFailure, { err });
    }
  };
};

export const deletePhoto = values => {
  return async dispatch => {
    dispatch(actions.deletePhotoRequest());

    const res = await axios.patch("/users/me/photo", values);
    dispatch(actions.updateProfileSuccess(res.data));
    toast.success("Photo deleted successfully");
  };
};

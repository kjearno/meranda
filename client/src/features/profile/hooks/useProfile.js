import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "@shared/constants";
import { selectUserById } from "@shared/entities";
import {
  selectError,
  selectMyId,
  selectStatus,
  updatePassword,
  updatePhoto,
} from "../profileSlice";

export const useProfile = () => {
  const dispatch = useDispatch();

  const myId = useSelector(selectMyId);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const user = useSelector((state) => selectUserById(state, myId));

  const handlePasswordUpdate = (values, actions) => {
    dispatch(updatePassword({ values, actions }));
  };

  const handlePhotoUpdate = (event) => {
    event.preventDefault();
    const values = new FormData(event.target);
    dispatch(updatePhoto(values));
  };

  const handlePhotoDelete = () => {
    const values = new FormData();
    values.append("photo", {});
    dispatch(updatePhoto(values));
  };

  return {
    user,
    isLoading: status === LOADING_STATUS,
    error,
    onPasswordUpdate: handlePasswordUpdate,
    onPhotoUpdate: handlePhotoUpdate,
    onPhotoDelete: handlePhotoDelete,
  };
};

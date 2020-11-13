import { useDispatch, useSelector } from "react-redux";
import { profileOperations, profileSelectors } from "../modules/profile";

export const useProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector(profileSelectors.user);
  const { loading, error } = useSelector(profileSelectors.everything);

  const handlePasswordUpdate = (values, actions) => {
    dispatch(profileOperations.updatePassword(values, actions));
  };

  const handlePhotoUpdate = event => {
    event.preventDefault();
    const values = new FormData(event.target);
    dispatch(profileOperations.updatePhoto(values));
  };

  const handlePhotoDelete = () => {
    const values = new FormData();
    values.append("photo", {});

    dispatch(profileOperations.deletePhoto(values));
  };

  return {
    user,
    isLoading: loading,
    error,
    onPasswordUpdate: handlePasswordUpdate,
    onPhotoUpdate: handlePhotoUpdate,
    onPhotoDelete: handlePhotoDelete
  };
};

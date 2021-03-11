import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "@features/auth";
import { authOperations } from "../modules/auth";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(authSelectors.everything);

  const handleLogin = formData => dispatch(authOperations.login(formData));

  return {
    isLoading: loading,
    onLogin: handleLogin
  };
};

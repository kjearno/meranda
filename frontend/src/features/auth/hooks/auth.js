import { useDispatch, useSelector } from "react-redux";
import { profileSelectors } from "@features/profile";
import { authOperations, authSelectors } from "../modules/auth";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector(authSelectors.everything);
  const user = useSelector(profileSelectors.user);

  const handleRegister = values => {
    dispatch(authOperations.register(values));
  };

  const handleLogin = values => {
    dispatch(authOperations.login(values));
  };

  const handleLogout = () => {
    dispatch(authOperations.logout());
  };

  return {
    user,
    isAuthenticated,
    isLoading: loading,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout
  };
};

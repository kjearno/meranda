import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "@shared/constants";
import {
  login,
  logout,
  register,
  selectIsAuthenticated,
  selectStatus,
} from "../authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status = useSelector(selectStatus);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = (values) => {
    dispatch(register(values));
  };

  return {
    isAuthenticated,
    isLoading: status === LOADING_STATUS,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };
};

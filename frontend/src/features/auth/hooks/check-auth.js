import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../modules/auth";

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.checkAuth());
  }, [dispatch]);
};

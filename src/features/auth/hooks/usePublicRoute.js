import { useEffect } from "react";
import { history } from "@shared/lib";
import { useAuth } from "./useAuth";

export const usePublicRoute = (redirectTo = "/") => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo]);
};

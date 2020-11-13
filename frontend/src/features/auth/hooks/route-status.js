import { useEffect } from "react";
import { history } from "@lib/routing";
import { useAuth } from "./auth";

// declare route only for non-authenticated users
export const usePublicRoute = (redirectTo = "/") => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo]);
};

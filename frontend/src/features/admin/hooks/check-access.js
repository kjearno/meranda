import { useEffect } from "react";
import { useSelector } from "react-redux";
import { profileSelectors } from "@features/profile";
import { history } from "@lib/routing";

export const useCheckAccess = () => {
  const isAdmin = useSelector(profileSelectors.isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      history.push("/admin/forbidden");
    }
  }, [isAdmin]);
};

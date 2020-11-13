import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Forbidden } from "@features/admin";
import { profileSelectors } from "@features/profile";
import { history } from "@lib/routing";

export const AdminForbiddenPage = () => {
  const isAdmin = useSelector(profileSelectors.isAdmin);

  useEffect(() => {
    if (isAdmin) {
      history.push("/admin");
    }
  }, [isAdmin]);

  return (
    <>
      <Helmet title="Forbidden" />
      <Forbidden />;
    </>
  );
};

import React from "react";
import { Helmet } from "react-helmet";
import { AdminAuthTemplate, Login } from "@features/admin";
import { usePublicRoute } from "@features/auth";

export const AdminLoginPage = () => {
  usePublicRoute("/admin");

  return (
    <>
      <Helmet title="Login" />

      <AdminAuthTemplate>
        <Login />
      </AdminAuthTemplate>
    </>
  );
};

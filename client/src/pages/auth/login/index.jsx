import React from "react";
import { Helmet } from "react-helmet";
import { AuthTemplate, Login, usePublicRoute } from "@features/auth";

export function LoginPage() {
  usePublicRoute();

  return (
    <AuthTemplate>
      <Helmet title="Log in" />

      <Login />
    </AuthTemplate>
  );
}

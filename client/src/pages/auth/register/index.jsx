import React from "react";
import { Helmet } from "react-helmet";
import { AuthTemplate, Register, usePublicRoute } from "@features/auth";

export function RegisterPage() {
  usePublicRoute();

  return (
    <AuthTemplate>
      <Helmet title="Sign up" />

      <Register />
    </AuthTemplate>
  );
}

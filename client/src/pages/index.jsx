import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@features/auth";
import { renderRoutes } from "@shared/lib";
import { routes } from "./routes";

export function Pages() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Helmet defaultTitle="meranda" titleTemplate="%s — meranda" />
      {renderRoutes({ routes, isAuthenticated })}
    </>
  );
}

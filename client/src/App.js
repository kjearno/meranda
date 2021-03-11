import React from "react";
import { Helmet } from "react-helmet";
import { useCheckAuth } from "@features/auth";
import { config } from "@src/config";
import { Router } from "./Router";

const { appName } = config;

export const App = () => {
  useCheckAuth();

  return (
    <>
      <Helmet defaultTitle={appName} titleTemplate={`%s — ${appName}`} />
      <Router />
    </>
  );
};

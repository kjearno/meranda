import "react-toastify/dist/ReactToastify.min.css";
import "@shared/styles/globals.scss";
import React from "react";
import { Helmet } from "react-helmet";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuth } from "@features/auth";
import { ScrollToTop } from "@shared/components";
import { history, renderRoutes } from "@shared/lib";
import routes from "./_routes";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router history={history}>
      <ScrollToTop />
      <ToastContainer position="bottom-right" limit="1" />
      <Helmet defaultTitle="meranda" titleTemplate="%s — meranda" />
      {renderRoutes({ routes, isAuthenticated })}
    </Router>
  );
}

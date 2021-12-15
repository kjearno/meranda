import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Pages } from "@pages";
import { ScrollToTop } from "@shared/components";
import { history } from "@shared/lib";
import "react-toastify/dist/ReactToastify.min.css";
import "@shared/styles/globals.scss";

export function App() {
  return (
    <Router history={history}>
      <ScrollToTop />
      <ToastContainer position="bottom-right" limit="1" />
      <Pages />
    </Router>
  );
}

import "react-toastify/dist/ReactToastify.min.css";
import "@styles/globals.scss";
import React from "react";
import { Helmet } from "react-helmet";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ScrollToTop } from "@components/ScrollToTop";
import routes from "./_routes";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <ToastContainer position="bottom-right" limit="1" />
      <Helmet defaultTitle="meranda" titleTemplate="%s — meranda" />
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            render={() => <route.component />}
          />
        ))}
      </Switch>
    </HashRouter>
  );
}

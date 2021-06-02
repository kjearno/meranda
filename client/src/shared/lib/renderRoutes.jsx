import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const handleRender = ({ route, notAllowed }) => {
  if (route.redirect) {
    return <Redirect to={route.redirect} />;
  }

  if (notAllowed) {
    return <Redirect to="/auth/login" />;
  }

  return <route.component />;
};

export const renderRoutes = ({ routes, isAuthenticated }) => (
  <Switch>
    {routes.map((route, i) => {
      const notAllowed = route.private && !isAuthenticated;

      return (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          render={() => handleRender({ route, notAllowed })}
        />
      );
    })}
  </Switch>
);

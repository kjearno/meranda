import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "@features/auth";
import { getRedirectPath } from "@lib/routing";
import { routes } from "@pages/routes";

export const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {routes.map(({ Component, redirect, ...route }, i) => {
        const notAllowed = route.private && !isAuthenticated;

        return (
          <Route
            key={i}
            render={() =>
              redirect ? (
                <Redirect to={redirect} />
              ) : notAllowed ? (
                <Redirect to={getRedirectPath(route.path)} />
              ) : (
                <Component />
              )
            }
            {...route}
          />
        );
      })}
    </Switch>
  );
};

import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

export function NotFoundError() {
  const { location } = useHistory();
  const { pathname } = location;

  return (
    <>
      <Helmet title="Not Found" />

      <h4>Page not found</h4>
      <p>
        No match for <code>{pathname}</code>
      </p>
    </>
  );
}

import React from "react";
import { Helmet } from "react-helmet";

export const CommonError = () => (
  <>
    <Helmet title="Error" />

    <h4>Something went wrong</h4>
    <p>Please refresh the page</p>
  </>
);

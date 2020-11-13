import React from "react";
import { NotFound } from "./NotFound";
import { CommonError } from "./CommonError";

export const Error = ({ error }) => {
  switch (error.name) {
    case "NotFoundError":
      return <NotFound />;

    default:
      return <CommonError message={error.message} />;
  }
};

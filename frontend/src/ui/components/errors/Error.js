import React from "react";
import { CommonError } from "./CommonError";
import { NotFound } from "./NotFound";

export const Error = ({ error }) => {
  switch (error.name) {
    case "NotFoundError":
      return <NotFound />;

    default:
      return <CommonError />;
  }
};

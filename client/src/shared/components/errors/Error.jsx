import React from "react";
import PropTypes from "prop-types";
import { CommonError } from "./CommonError";
import { NotFound } from "./NotFound";

export function Error({ error }) {
  switch (error.name) {
    case "NotFoundError":
      return <NotFound />;
    default:
      return <CommonError />;
  }
}

Error.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

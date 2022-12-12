import PropTypes from "prop-types";
import React from "react";

import { CommonError } from "./CommonError";
import { NotFoundError } from "./NotFoundError";

export function Error({ error }) {
  switch (error.name) {
    case "NotFoundError":
      return <NotFoundError />;
    default:
      return <CommonError />;
  }
}

Error.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

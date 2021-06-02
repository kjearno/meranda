import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function MetaCategory({ name, slug }) {
  return (
    <>
      {" "}
      in <Link to={slug}>{name}</Link>
    </>
  );
}

MetaCategory.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

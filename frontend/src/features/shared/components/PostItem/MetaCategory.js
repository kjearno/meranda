import React from "react";
import { Link } from "react-router-dom";

export const MetaCategory = ({ category }) => (
  <>
    | <Link to={category.slug}>{category.name}</Link>
  </>
);

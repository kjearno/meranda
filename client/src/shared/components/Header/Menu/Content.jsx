import { ListItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { useCategories } from "@features/entities";
import { Loader } from "./Loader";
import styles from "./Menu.module.scss";

export function Content() {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return <Loader n={3} />;
  }

  return categories.map((category) => (
    <ListItem className={styles.item} key={category.id} button>
      <Link to={`/${category.slug}`}>{category.name}</Link>
    </ListItem>
  ));
}

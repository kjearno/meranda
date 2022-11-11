import { ListItem } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "@features/auth";
import styles from "./Menu.module.scss";

export function Userbar() {
  const { isAuthenticated, onLogout } = useAuth();
  const history = useHistory();
  const { pathname, search } = history.location;

  if (isAuthenticated) {
    return (
      <>
        <ListItem className={styles.item} button>
          <Link to="/profile">Profile</Link>
        </ListItem>

        <ListItem className={styles.item} button>
          <Link to={{ pathname, search }} onClick={onLogout}>
            Log out
          </Link>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListItem className={styles.item} button>
        <Link to="/auth/login">Log in</Link>
      </ListItem>

      <ListItem className={styles.item} button>
        <Link to="/auth/register">Sign up</Link>
      </ListItem>
    </>
  );
}

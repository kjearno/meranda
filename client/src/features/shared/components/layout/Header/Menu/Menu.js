import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@features/auth";
import { history } from "@lib/routing";

import { Divider, List, ListItem } from "@material-ui/core";
import styles from "./Menu.module.scss";

export const Menu = props => {
  const { isAuthenticated, onLogout } = useAuth();
  const { pathname, search } = history.location;

  return (
    <List className={styles.list} {...props}>
      <ListItem className={styles.item} button>
        <Link to="/politics">Politics</Link>
      </ListItem>

      <ListItem className={styles.item} button>
        <Link to="/health">Health</Link>
      </ListItem>

      <ListItem className={styles.item} button>
        <Link to="/business">Business</Link>
      </ListItem>

      <Divider />

      {isAuthenticated ? (
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
      ) : (
        <>
          <ListItem className={styles.item} button>
            <Link to="/auth/login">Log in</Link>
          </ListItem>

          <ListItem className={styles.item} button>
            <Link to="/auth/register">Sign up</Link>
          </ListItem>
        </>
      )}
    </List>
  );
};

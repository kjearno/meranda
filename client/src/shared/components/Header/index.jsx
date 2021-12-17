import { Divider, Drawer, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Grid } from "react-flexbox-grid";
import { Link } from "react-router-dom";

import { Menu } from "./Menu";
import styles from "./Header.module.scss";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <header className={styles.header}>
      <Grid>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            Meranda
          </Link>

          <button
            className={styles.button}
            onClick={handleDrawerToggle}
            type="button"
          >
            <MenuIcon />
          </button>

          <div className={styles.collapse}>
            <Menu />
          </div>
        </div>

        <Drawer
          className={styles.drawer}
          anchor="right"
          open={open}
          onClose={handleDrawerToggle}
        >
          <div className={styles.drawerBody}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronRightIcon />
            </IconButton>
            <Divider />
            <Menu onClick={handleDrawerToggle} />
          </div>
        </Drawer>
      </Grid>
    </header>
  );
}

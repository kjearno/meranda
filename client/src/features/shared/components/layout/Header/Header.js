import React, { useState } from "react";

import { Grid, Row, Col } from "react-flexbox-grid";
import { Divider, Drawer, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { MenuIcon } from "@ui/assets";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import styles from "./Header.module.scss";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(prevValue => !prevValue);
  };

  return (
    <div className={styles.wrapper}>
      <Grid>
        <Row>
          <Col xs={12} lg>
            <div className={styles.collapse}>
              <Logo />

              <button
                className={styles.menuButton}
                onClick={handleDrawerToggle}
              >
                <img src={MenuIcon} alt="" />
              </button>
            </div>
          </Col>

          <Col>
            <div>
              <div className={styles.expand}>
                <Menu />
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
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

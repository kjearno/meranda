import React, { useState } from "react";

import { Tab, Tabs } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PhotoIcon from "@material-ui/icons/Photo";
import { Paper } from "@ui/components";
import { Password } from "./Password";
import { Photo } from "./Photo";
import styles from "./Profile.module.scss";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper>
      <Tabs
        className={styles.tabs}
        centered
        indicatorColor="secondary"
        textColor="secondary"
        value={activeTab}
        variant="standard"
        onChange={(event, value) => setActiveTab(value)}
      >
        <Tab icon={<LockIcon />} label="Password" />
        <Tab icon={<PhotoIcon />} label="Photo" />
      </Tabs>

      {activeTab === 0 && <Password />}
      {activeTab === 1 && <Photo />}
    </Paper>
  );
};

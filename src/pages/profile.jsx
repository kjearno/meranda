import { Tab, Tabs } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PhotoIcon from "@material-ui/icons/Photo";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import {
  ProfileTemplate,
  Password,
  Photo,
  useProfile,
} from "@features/profile";
import { Paper } from "@shared/components";
import styles from "@shared/styles/Profile.module.scss";

export default function Profile() {
  const { user } = useProfile();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProfileTemplate>
      <Helmet title={`${user.username} :: Profile`} />

      <Paper>
        <Tabs
          className={styles.tabs}
          centered
          indicatorColor="secondary"
          textColor="secondary"
          value={activeTab}
          variant="standard"
          onChange={(_, value) => setActiveTab(value)}
        >
          <Tab icon={<LockIcon />} label="Password" />
          <Tab icon={<PhotoIcon />} label="Photo" />
        </Tabs>

        {activeTab === 0 && <Password />}
        {activeTab === 1 && <Photo />}
      </Paper>
    </ProfileTemplate>
  );
}

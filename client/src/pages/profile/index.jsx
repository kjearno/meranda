import React from "react";
import { Helmet } from "react-helmet";
import { Profile, ProfileTemplate, useProfile } from "@features/profile";

export function ProfilePage() {
  const { user } = useProfile();

  return (
    <ProfileTemplate>
      <Helmet title={`${user.username} :: Profile`} />

      <Profile />
    </ProfileTemplate>
  );
}

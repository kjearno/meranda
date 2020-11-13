import React from "react";
import { Helmet } from "react-helmet";
import { useProfile, ProfileTemplate, Profile } from "@features/profile";

export const ProfilePage = () => {
  const { user } = useProfile();
  const title = `Profile :: ${user.username}`;

  return (
    <>
      <Helmet title={title} />

      <ProfileTemplate>
        <Profile />
      </ProfileTemplate>
    </>
  );
};

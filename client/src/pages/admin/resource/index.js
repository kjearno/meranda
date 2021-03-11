import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { capitalize } from "lodash-es";
import { AdminListTemplate, ResourceList } from "@features/admin";

export const AdminResourcePage = () => {
  const { resource } = useParams();
  const title = `${capitalize(resource)}`;

  return (
    <>
      <Helmet title={title} />

      <AdminListTemplate>
        <ResourceList />
      </AdminListTemplate>
    </>
  );
};

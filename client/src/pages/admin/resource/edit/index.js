import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { capitalize } from "lodash-es";
import { AdminTemplate, ResourceEdit } from "@features/admin";

export const AdminResourceEditPage = () => {
  const { resource } = useParams();
  const title = `Edit :: ${capitalize(resource)}`;

  return (
    <>
      <Helmet title={title} />

      <AdminTemplate>
        <ResourceEdit />
      </AdminTemplate>
    </>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { capitalize } from "lodash-es";
import { AdminTemplate, ResourceCreate } from "@features/admin";

export const AdminResourceCreatePage = () => {
  const { resource } = useParams();
  const title = `Create :: ${capitalize(resource)}`;

  return (
    <>
      <Helmet title={title} />

      <AdminTemplate>
        <ResourceCreate />
      </AdminTemplate>
    </>
  );
};

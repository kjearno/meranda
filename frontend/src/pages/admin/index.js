import React from "react";
import { Helmet } from "react-helmet";
import { AdminTemplate } from "@features/admin";

export const AdminPage = () => (
  <>
    <Helmet title="Dashboard" />

    <AdminTemplate>
      <div>
        <p>Welcome to Admin panel</p>
      </div>
    </AdminTemplate>
  </>
);

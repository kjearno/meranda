import { AdminPage } from "./admin";
import { AdminForbiddenPage } from "./admin/forbidden";
import { AdminLoginPage } from "./admin/login";
import { AdminNoMatchPage } from "./admin/no-match";
import { AdminResourcePage } from "./admin/resource";
import { AdminResourceCreatePage } from "./admin/resource/create";
import { AdminResourceEditPage } from "./admin/resource/edit";

import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { CategoryPage } from "./category";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";
import { PostPage } from "./post";
import { ProfilePage } from "./profile";

export const routes = [
  {
    path: "/admin",
    exact: true,
    private: true,
    Component: AdminPage
  },
  {
    path: "/admin/forbidden",
    exact: true,
    private: true,
    Component: AdminForbiddenPage
  },
  {
    path: "/admin/login",
    exact: true,
    Component: AdminLoginPage
  },
  {
    path: "/admin/:resource",
    exact: true,
    private: true,
    Component: AdminResourcePage
  },
  {
    path: "/admin/:resource/create",
    exact: true,
    private: true,
    Component: AdminResourceCreatePage
  },
  {
    path: "/admin/:resource/:id/edit",
    exact: true,
    private: true,
    Component: AdminResourceEditPage
  },
  {
    path: "/admin/*",
    private: true,
    Component: AdminNoMatchPage
  },

  {
    path: "/",
    exact: true,
    Component: HomePage
  },
  {
    path: "/auth",
    exact: true,
    redirect: "/auth/login"
  },
  {
    path: "/auth/login",
    exact: true,
    Component: LoginPage
  },
  {
    path: "/auth/register",
    exact: true,
    Component: RegisterPage
  },
  {
    path: "/profile",
    exact: true,
    private: true,
    Component: ProfilePage
  },
  {
    path: "/:categorySlug",
    exact: true,
    Component: CategoryPage
  },
  {
    path: "/:categorySlug/:postSlug",
    exact: true,
    Component: PostPage
  },
  {
    path: "*",
    Component: NotFoundPage
  }
];

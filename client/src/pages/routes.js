import { ArticlePage } from "./article";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { CategoryPage } from "./category";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";
import { ProfilePage } from "./profile";

export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/auth",
    exact: true,
    redirect: "/auth/login",
  },
  {
    path: "/auth/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/auth/register",
    exact: true,
    component: RegisterPage,
  },
  {
    path: "/profile",
    exact: true,
    private: true,
    component: ProfilePage,
  },
  {
    path: "/:categorySlug",
    exact: true,
    component: CategoryPage,
  },
  {
    path: "/:categorySlug/:articleSlug",
    exact: true,
    component: ArticlePage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

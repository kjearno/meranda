import Article from "./[category]/[article]";
import Category from "./[category]";
import Login from "./auth/login";
import Register from "./auth/register";
import NotFound from "./404";
import Home from "./index";
import Profile from "./profile";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/auth",
    exact: true,
    redirect: "/auth/login",
  },
  {
    path: "/auth/login",
    exact: true,
    component: Login,
  },
  {
    path: "/auth/register",
    exact: true,
    component: Register,
  },
  {
    path: "/profile",
    exact: true,
    private: true,
    component: Profile,
  },
  {
    path: "/:categorySlug",
    exact: true,
    component: Category,
  },
  {
    path: "/:categorySlug/:articleSlug",
    exact: true,
    component: Article,
  },
  {
    path: "*",
    component: NotFound,
  },
];

import Article from "./[article]";
import NotFound from "./404";
import Home from "./index";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/:articleSlug",
    exact: true,
    component: Article,
  },
  {
    path: "*",
    component: NotFound,
  },
];

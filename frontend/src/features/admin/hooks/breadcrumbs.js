import { useState, useEffect } from "react";
import { history } from "@lib/routing";

export const useBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { pathname } = history.location;

  useEffect(() => {
    const breadcrumbs = pathname
      .split("/")
      .slice(2)
      .map(crumbPart => crumbPart[0].toUpperCase() + crumbPart.slice(1));

    setBreadcrumbs(breadcrumbs);
  }, [pathname]);

  return breadcrumbs;
};

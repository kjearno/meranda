export const getRedirectPath = path => {
  const base = path.split("/")[1];

  if (base === "admin") {
    return "/admin/login";
  }

  return "/auth/login";
};

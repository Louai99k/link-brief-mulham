const ROUTES = {
  DASHBOARD: "/dashboard",
  LINKS: "/links",
  LOGIN: "/login",
  MAIN: "/",
  LINK_PAGE: (link: string) => `/link/${link}`,
};

export default ROUTES;

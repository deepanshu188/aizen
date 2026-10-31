export const isActivePath = (path: string, link: string) =>
  path === link || (link !== "/" && path.startsWith(`${link}/`));

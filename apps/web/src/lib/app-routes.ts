import type { AppType } from "@/components/desktop/types";

export const APP_TO_PATH: Record<AppType, string> = {
  home: "/",
  members: "/members",
  events: "/events",
  mission: "/mission",
  testimonials: "/testimonials",
  faq: "/faq",
  about: "/about",
};

const PATH_TO_APP: Record<string, AppType> = Object.fromEntries(
  Object.entries(APP_TO_PATH).map(([app, path]) => [path, app as AppType]),
) as Record<string, AppType>;

export function appTypePath(appType: AppType): string {
  return APP_TO_PATH[appType];
}

export function pathToAppType(pathname: string): AppType | undefined {
  return PATH_TO_APP[pathname];
}

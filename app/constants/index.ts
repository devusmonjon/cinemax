import {
  Calendar,
  Home,
  Inbox,
  LucideProps,
  Search,
  Settings,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface INavLinks {
  title: string;
  href: string;
}

interface ISidebarMenuItems {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const NAV_LINKS: INavLinks[] = [
  {
    title: "Movies",
    href: "/movies",
  },
  {
    title: "Series",
    href: "/series",
  },
  {
    title: "Genres",
    href: "/genres",
  },
];

export const SIDEBAR_MENU_ITEMS: ISidebarMenuItems[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Top Rated",
    url: "/top-rated",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

import { DiscoveryIcon, StopwatchIcon, TopRatedIcon } from "@/icons";

interface INavLinks {
  title: string;
  href: string;
}

interface ISidebarMenuItems {
  title: string;
  url: string;
  icon: React.ReactElement<SVGSVGElement>;
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
    icon: <DiscoveryIcon className="!min-w-[24px] !min-h-[24px]" />,
  },
  {
    title: "Top Rated",
    url: "/top-rated",
    icon: <TopRatedIcon className="!min-w-[24px] !min-h-[24px]" />,
  },
  {
    title: "Coming Soon",
    url: "/coming-soon",
    icon: <StopwatchIcon className="!min-w-[24px] !min-h-[24px]" />,
  },
];
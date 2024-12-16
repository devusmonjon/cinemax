import {
  DiscoveryIcon,
  FilmIcon,
  NotificationIcon,
  StopwatchIcon,
  TopRatedIcon,
} from "@/icons";
import {
  ChartNoAxesCombined,
  Clapperboard,
  Popcorn,
  TvMinimalPlay,
  Video,
} from "lucide-react";

interface INavLinks {
  title: string;
  href: string;
}

interface ISidebarMenuItems {
  title: string;
  url: string;
  icon: React.ReactElement<SVGSVGElement>;
  children?: ISidebarMenuItems[];
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
export const AMIN_SIDEBAR_MENU_ITEMS: ISidebarMenuItems[] = [
  {
    title: "Statistics",
    url: "/admin/statistics",
    icon: <ChartNoAxesCombined size="24" />,
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: <NotificationIcon className="!min-w-[24px] !min-h-[24px]" />,
  },
  {
    title: "Genres",
    url: "/admin/genres",
    icon: <Popcorn size="24" />,
  },
  {
    title: "Movies",
    url: "/admin/movies",
    icon: <FilmIcon className="!min-w-[24px] !min-h-[24px]" />,
  },
  {
    title: "Series",
    url: "/admin/series",
    icon: <Clapperboard size="24" />,
    children: [
      {
        title: "Seasons",
        url: "/admin/series/seasons",
        icon: <TvMinimalPlay size="24" />,
      },
      {
        title: "Episodes",
        url: "/admin/series/episodes",
        icon: <Video size="24" />,
      },
    ],
  },
];

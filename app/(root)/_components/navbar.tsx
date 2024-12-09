import { NAV_LINKS } from "@/app/constants";
import Heading from "@/components/typography/headings";
import Text from "@/components/typography/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, NotificationIcon, SearchIcon } from "@/icons";
import { INotification } from "@/interfaces";
import { isActive } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { LogOut, RefreshCw } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [notifications, setNotifications] = useState<INotification[] | null>(
    null
  );
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [limit, setLimit] = useState(10);
  const pathname = usePathname();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //   @ts-expect-error: error not defined
  const fullName = data?.user?.fullName
    ?.split(" ")
    .map((word: string) => (word[0] ? word[0].toUpperCase() : ""))
    .join("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response: {
        payload: INotification[];
        total: number;
        limit: number;
      } = await fetch(`/api/notifications?limit=${limit}`).then((res) =>
        res.json()
      );
      setNotifications(response.payload);
      setTotalNotifications(response.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [pathname, limit]);
  console.log(notifications);

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] flex items-center z-50 bg-background">
      <div className="min-w-[257px]">
        <Link href="/" className="ml-[56px] w-min inline-block">
          <Text size="xl" weight="bold">
            CineMax
          </Text>
        </Link>
      </div>
      <div className="w-full flex justify-between items-center h-full pl-[32px] pr-[32px]">
        <div className="flex items-center h-full gap-[36px]">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className={cn(
                "duration-300 hover:text-primary",
                isActive(pathname, link.href) && "text-primary"
              )}
              title={link.title}
            >
              <Text
                size="md"
                weight={isActive(pathname, link.href) ? "bold" : "medium"}
                className="!text-inherit"
              >
                {link.title}
              </Text>
            </Link>
          ))}
        </div>
        <Button className="!p-0 !w-min !h-min rounded-full" variant={"ghost"}>
          <SearchIcon className="!w-[24px] !h-[24px]" />
        </Button>
      </div>
      <div className="min-w-[362px] flex items-center h-full pl-[34px] gap-[32px]">
        <Button className="h-[40px]">
          <Text size="md" weight="semibold" className="text-grayscale-10">
            Subscribe
          </Text>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="!p-0 !w-min !h-[32px] rounded-full items-end relative"
              variant={"ghost"}
            >
              <NotificationIcon className="!w-[24px] !h-[24px]" />
              {totalNotifications > 0 && (
                <span className="text-grayscale-10 absolute top-0 -right-[8px] w-[18px] h-[18px] rounded-full flex items-center justify-center bg-[#EC6083] font-plus-jakarta-sans text-[12px] font-medium leading-[16px] tracking-[0.06px]">
                  {totalNotifications < 100 ? totalNotifications : "9+"}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] mt-[15px] overflow-hidden">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications{" "}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className={cn(
                    "py-2 px-2",
                    loading && "animate-spin ![animation-duration:1s]"
                  )}
                  onClick={fetchNotifications}
                >
                  <RefreshCw />
                </Button>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="h-[336px] overflow-y-auto">
              {notifications &&
                notifications?.length > 0 &&
                notifications.map((notification) => (
                  <DropdownMenuItem
                    className="cursor-pointer items-start"
                    key={notification._id}
                  >
                    <div
                      className={cn(
                        "min-w-[100px] min-h-[100px] rounded-md relative overflow-hidden",
                        !notification.image && "bg-muted-foreground"
                      )}
                    >
                      {notification.image && (
                        <Image
                          src={notification?.image}
                          alt={notification.message}
                          fill
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Heading
                        variant="h2"
                        weight="bold"
                        className="!text-inherit text-[18px]"
                        title={notification.title}
                      >
                        {notification.title.slice(0, 25) +
                          (notification.title.length > 25 ? "..." : "")}
                      </Heading>
                      <Text
                        className="!text-muted-foreground mt-2 leading-[14px]"
                        size="sm"
                        weight="medium"
                        title={notification.message}
                      >
                        {notification.message.slice(0, 60) +
                          (notification.message.length > 60 ? "..." : "")}
                      </Text>
                    </div>
                  </DropdownMenuItem>
                ))}
              <Button
                className="cursor-pointer justify-center py-4 w-full mt-[5px]"
                onClick={() => setLimit((prev) => prev + 10)}
                variant={"secondary"}
                disabled={
                  loading ||
                  (notifications
                    ? notifications?.length >= totalNotifications
                    : false)
                }
              >
                Show more ({totalNotifications} of{" "}
                {limit <= totalNotifications ? limit : totalNotifications})
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button title="Profile" className="flex items-center gap-1">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image || ""}
                  alt={"Profile Picture"}
                />
                <AvatarFallback>{fullName}</AvatarFallback>
              </Avatar>
              <ArrowDown className="w-[20px] h-[20px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] mr-[10px] mt-[15px]">
            <DropdownMenuLabel>
              {
                // @ts-expect-error: error not defined
                data?.user?.fullName
              }
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Billing</DropdownMenuItem>
            <DropdownMenuItem disabled>Team</DropdownMenuItem>
            <DropdownMenuItem disabled>Subscription</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() => void signOut()}
                className="w-full cursor-pointer h-8"
                variant={"destructive"}
              >
                <Text size="sm" weight="medium">
                  Logout
                </Text>
                <LogOut />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

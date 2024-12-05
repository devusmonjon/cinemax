import { NAV_LINKS } from "@/app/constants";
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
import { isActive } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data } = useSession();

  //   @ts-expect-error: error not defined
  const fullName = data?.user?.fullName
    ?.split(" ")
    .map((word: string) => word[0].toUpperCase())
    .join("");

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
          <Text size="md" weight="semibold">
            Subscribe
          </Text>
        </Button>
        <Button
          className="!p-0 !w-min !h-[32px] rounded-full items-end relative"
          variant={"ghost"}
        >
          <NotificationIcon className="!w-[24px] !h-[24px]" />
          <span className="absolute top-0 -right-[8px] w-[18px] h-[18px] rounded-full flex items-center justify-center bg-[#EC6083] font-plus-jakarta-sans text-[12px] font-medium leading-[16px] tracking-[0.06px]">
            3
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button title="Profile" className="flex items-center gap-1">
              <Avatar>
                <AvatarImage src={data?.user?.image || ""} alt="@shadcn" />
                <AvatarFallback>{fullName}</AvatarFallback>
              </Avatar>
              <ArrowDown className="w-[20px] h-[20px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] mr-[10px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
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

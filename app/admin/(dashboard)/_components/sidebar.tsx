"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { isActive } from "@/lib/helpers";
import Text from "@/components/typography/text";
import { AMIN_SIDEBAR_MENU_ITEMS } from "@/app/constants";
import { cn } from "@/lib/utils";
import { MoonIcon } from "@/icons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import NoSSR from "react-no-ssr";

// Menu items.

export function AdminSidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  return (
    <NoSSR>
      <Sidebar className="w-[257px]">
        <SidebarContent className="dark:bg-dark bg-grayscale-10">
          <SidebarGroup className="p-0 pt-[46px]">
            <SidebarGroupLabel className="!p-0">
              <Text
                size="md"
                weight="medium"
                className="!text-grayscale-60 pl-[32px]"
              >
                MENU
              </Text>
            </SidebarGroupLabel>
            <SidebarGroupContent className="pt-[16px]">
              <SidebarMenu className="gap-4">
                {AMIN_SIDEBAR_MENU_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title} className="bg-none">
                    <Link
                      href={item.url}
                      className={cn(
                        "w-full text-start px-[28px] py-[8px] flex items-center gap-2 duration-300 relative group hover:text-primary text-grayscale-70",
                        isActive(
                          pathname.replace("/admin", ""),
                          item.url.replace("/admin", "")
                        ) && "text-primary"
                      )}
                    >
                      {item.icon}
                      <Text
                        size="md"
                        weight="semibold"
                        className={cn(
                          "!text-inherit w-full h-full",
                          isActive(
                            pathname.replace("/admin", ""),
                            item.url.replace("/admin", "")
                          ) && "!text-grayscale-100 dark:!text-grayscale-10"
                        )}
                      >
                        {item.title}
                      </Text>
                      <span
                        className={cn(
                          "absolute h-6 w-1 left-0 top-2 bg-primary opacity-0 duration-300",
                          isActive(
                            pathname.replace("/admin", ""),
                            item.url.replace("/admin", "")
                          ) && "opacity-100"
                        )}
                      ></span>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Text
                size="md"
                weight="medium"
                className="!text-grayscale-60 pl-[32px] mt-[32px] mb-[16px]"
              >
                LIBRARY
              </Text>
              <SidebarMenu className="gap-4">
                <SidebarMenuItem key={"Dark mode"} className="bg-none">
                  <Label
                    role="button"
                    className={cn(
                      "w-full text-start px-[28px] py-[8px] flex items-center gap-2 duration-300 relative group hover:text-primary text-grayscale-70 justify-between cursor-pointer"
                    )}
                    htmlFor="dark-mode"
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <MoonIcon className="!min-w-6 !min-h-6" />
                      <Text
                        size="md"
                        weight="semibold"
                        className={cn("!text-inherit w-full h-full")}
                      >
                        Dark Mode
                      </Text>
                      <span
                        className={cn(
                          "absolute h-6 w-1 left-0 top-2 bg-primary opacity-0 duration-300"
                        )}
                      ></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={theme === "dark"}
                        onCheckedChange={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      />
                    </div>
                  </Label>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </NoSSR>
  );
}

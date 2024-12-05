import { ArrowDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { isActive } from "@/lib/helpers";
import Text from "../typography/text";
import { SIDEBAR_MENU_ITEMS } from "@/app/constants";

// Menu items.

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="h-[calc(100vh_-_72px)] top-[72px] w-[257px]">
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
            <SidebarMenu>
              {SIDEBAR_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url, pathname)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuAction asChild>
                    <Button
                      size="icon"
                      variant={"secondary"}
                      className="!py-1 !px-1 h-auto"
                    >
                      <ArrowDown size="24" />
                    </Button>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

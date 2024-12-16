"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FC } from "react";
import { AdminSidebar } from "./_components/sidebar";
import Navbar from "@/components/shared/navbar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <Navbar />
      <SidebarTrigger />
      <main className="w-full mt-[72px]">{children}</main>
    </SidebarProvider>
  );
};

export default AdminLayout;

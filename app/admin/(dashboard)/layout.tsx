import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FC } from "react";
import { AdminSidebar } from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};

export default AdminLayout;

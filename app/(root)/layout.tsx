"use client";
import { AppSidebar } from "@/components/shared/sidebar";
import {
  SidebarProvider /* , SidebarTrigger */,
} from "@/components/ui/sidebar";
import useAuthState from "@/hooks/useAuthState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Navbar from "./_components/navbar";

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const { /*step,*/ setStep } = useAuthState();
  const router = useRouter();
  const session = useSession();
  console.log(session);

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      console.log("unauthenticated");

      setStep("login");
      router.push("/auth");
    }
  }, [session]);
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <AppSidebar />
        <main className="min-h-[calc(100vh_++100vh)] mt-[72px]">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;

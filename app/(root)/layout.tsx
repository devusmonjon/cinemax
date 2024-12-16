"use client";
import { AppSidebar } from "@/app/(root)/_components/sidebar";
import {
  SidebarProvider /* , SidebarTrigger */,
} from "@/components/ui/sidebar";
import useAuthState from "@/hooks/useAuthState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Navbar from "../../components/shared/navbar";
import useFcmToken from "@/hooks/useFcmToken";

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
  const { token, notificationPermissionStatus } = useFcmToken();

  // const handleTestNotification = async () => {
  //   const response = await fetch("/api/admin/send-notification", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: token,
  //       title: "Test Notification",
  //       message: "This is a test notification",
  //       link: "/contact",
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log(data);
  // };
  console.log(notificationPermissionStatus, token);

  return (
    <>
      <SidebarProvider>
        <Navbar />
        <AppSidebar />
        <main className="mt-[72px] w-full">{children}</main>
      </SidebarProvider>
    </>
  );
};

export default Layout;

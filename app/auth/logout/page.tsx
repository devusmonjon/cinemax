"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      signOut().then(() => router.push("/auth"));
    } else if (session.status === "unauthenticated") {
      router.push("/auth");
    }
  }, [session]);
  return <>Logging Out...</>;
};

export default LogoutPage;

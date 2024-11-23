"use client";
import useAuthState from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const { /*step,*/ setStep } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    setStep("login");
    router.push("/auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
};

export default Layout;

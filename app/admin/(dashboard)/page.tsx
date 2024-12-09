"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.push("/admin/statistics");
  }, [pathname]);
  return null;
};

export default AdminPage;

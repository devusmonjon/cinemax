import SettingsBar from "@/components/pages/_components/settings-bar";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full h-full bg-background">
      <SettingsBar />
      {children}
    </div>
  );
};

export default Layout;

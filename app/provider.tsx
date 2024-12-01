"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { SessionProvider } from "next-auth/react";

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}

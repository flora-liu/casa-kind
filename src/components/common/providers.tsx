"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import AuthProvider, { AuthProviderProps } from "./auth-provider";

type ProvidersProps = ThemeProviderProps & Omit<AuthProviderProps, "children">;

export function Providers({
  children,
  accessToken,
  userId,
  ...props
}: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider accessToken={accessToken} userId={userId}>
        {children}
      </AuthProvider>
    </NextThemesProvider>
  );
}

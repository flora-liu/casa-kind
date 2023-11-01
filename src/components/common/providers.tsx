"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import AuthProvider, {
  AuthProviderProps,
} from "@/components/common/auth-provider";
import GlobalProvider, {
  GlobalProviderProps,
} from "@/components/common/global-provider";

type ProvidersProps = ThemeProviderProps &
  Omit<AuthProviderProps, "children"> &
  Omit<GlobalProviderProps, "children">;

export function Providers({
  children,
  accessToken,
  userId,
  ...props
}: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider accessToken={accessToken} userId={userId}>
        <GlobalProvider>{children}</GlobalProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}

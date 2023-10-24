import localFont from "next/font/local";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "@/components/common/providers";
import { Nav } from "@/components/common/nav";
import { getSession } from "@/app/auth";
import "./globals.css";
import { cn } from "@/lib/utils";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

const relativeFont = localFont({
  src: [
    {
      path: "./fonts/relative-book.woff2",
      weight: "400",
    },
    {
      path: "./fonts/relative-bold.woff2",
      weight: "600",
    },
  ],
  variable: "--font-relative",
});

const relativeMonoFont = localFont({
  src: [
    {
      path: "./fonts/relative-mono.woff2",
      weight: "400",
    },
  ],
  variable: "--font-relative-mono",
});

const cambonFont = localFont({
  src: [
    {
      path: "./fonts/cambon-regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/cambon-thin-italic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-cambon",
});

export const metadata: Metadata = {
  title: "Casa Kind",
  description: "Miniapp for self-care and lifelong blossoming.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "light" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          accessToken={session?.access_token || null}
          userId={session?.user?.id}
        >
          <div
            className={cn(
              "flex flex-col min-h-screen relative text-foreground text-base",
              relativeFont.variable,
              relativeMonoFont.variable,
              cambonFont.variable
            )}
          >
            <Nav isLoggedIn={!!session?.user} />
            <main className="flex flex-col flex-1 bg-background h-full">
              {children}
            </main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

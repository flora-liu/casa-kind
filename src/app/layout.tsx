import localFont from "next/font/local";
import { Providers } from "@/components/common/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/common/nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthProvider from "@/components/common/auth-provider";

const inter = Inter({ subsets: ["latin"] });

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
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen relative text-foreground">
            <Nav />
            <main className="flex flex-col flex-1 bg-background h-full">
              <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
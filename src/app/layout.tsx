import localFont from "next/font/local";
import { Providers } from "@/components/common/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/common/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casa Kind",
  description: "Miniapp for self-care and lifelong blossoming.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="white"
          // defaultTheme="system"
          enableSystem
        >
          <div className="flex flex-col min-h-screen relative text-foreground">
            <Nav />
            <main className="flex flex-col flex-1 bg-background h-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { Providers } from "@/providers/provider";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <Header />
            <main
              style={{
                height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`
              }}
              className="flex flex-col w-full justify-start items-center"
            >
              {children}
            </main>
            <footer
              style={{ height: layoutConfig.footerHeight }}
              className="w-full flex items-center justify-center py-3"
            >
              <p>{siteConfig.description}</p>
            </footer>
          </SessionProvider>
        </Providers>
      </body>
    </html >
  );
}

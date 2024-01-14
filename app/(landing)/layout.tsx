import React, { ReactNode } from "react";
import { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import Appbar from "app/components/AppBar";
import Footer from "app/components/Footer";
import "app/styles/base.css";

import { getSession } from "app/lib/auth";

const roboto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Slyderz",
  description:
    "Enjoy the convenience of restaurant-quality meals cooked in your home.",
  openGraph: {
    title: "Slyderz",
    description:
      "Enjoy the convenience of restaurant-quality meals cooked in your home.",
    url: "https://slyderz.co",
    siteName: "Slyderz",
    images: [
      {
        url: "https://nextjs.org/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Slyderz",
    description:
      "Enjoy the convenience of restaurant-quality meals cooked in your home.",
    creator: "@slyderzapp",
    images: ["https://slyderz.co/api/og"], // Must be an absolute URL
  },
};

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = async ({ title, children }: LayoutProps) => {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Appbar user={session?.user} />
        <main>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;

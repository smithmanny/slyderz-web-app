import React, { ReactNode } from "react";
import Link from "next/link";
import { Noto_Sans } from "next/font/google";

import { Toaster } from "app/components/ui/sonner";
import Container from "app/components/Container";
import UserPopover from "app/components/UserPopover";
import SidePanel from "./SidePanel";

import { cn } from "app/lib/utils";
import { getSession } from "app/lib/auth";
import "app/styles/base.css";

const roboto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

type LayoutProps = {
  children: ReactNode;
  dashboard: ReactNode;
};

const Layout = async ({ children, dashboard }: LayoutProps) => {
  const session = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, "min-h-full")}>
        <Container className="px-0 sm:px-0 lg:px-0 max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-6">
            <section className="hidden md:block md:col-span-1 py-3 px-4 bg-blue-300">
              <Link href="/dashboard">
                <p className="text-xl leading-8 font-bold">Slyderz</p>
              </Link>

              <div className="py-8">
                <SidePanel />
              </div>
            </section>

            <section className="col-span-1 md:col-span-5 py-3 bg-red-400">
              <div className="flex justify-end pr-4">
                <UserPopover user={session?.user} />
              </div>

              <div className="py-8 px-4">{dashboard}</div>
            </section>
          </div>
        </Container>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;

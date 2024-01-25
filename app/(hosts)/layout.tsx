"use client";

import React, { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "app/components/ui/sonner";

import Container from "app/components/Container";

import "app/styles/base.css";

import { cn } from "app/lib/utils";

const roboto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

type LayoutProps = {
  children: ReactNode;
  menu: ReactNode;
};

const Layout = ({ children, menu }: LayoutProps) => {
  const menuSegment = useSelectedLayoutSegment("menu");
  console.log("menuSegment", menuSegment);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, "min-h-full")}>
        <Container className="px-0 sm:px-0 lg:px-0 max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-6">
            <section className="hidden md:block md:col-span-1 py-3 px-4 bg-blue-300">
              <p className="text-xl leading-8 font-bold">Slyderz</p>

              <div className="py-8">
                <ul className="space-y-1">
                  <li>
                    <a
                      href=""
                      className="flex items-center gap-2 rounded-lg bg-gray-100 pl-1 py-2 text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Dashboard </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="flex items-center gap-2 rounded-lg pl-1 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Menu </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="flex items-center gap-2 rounded-lg pl-1 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Hours </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="flex items-center gap-2 rounded-lg pl-1 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>

                      <span className="text-sm font-medium">
                        Payment Methods
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* {children} */}
            {menu}
          </div>
        </Container>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;

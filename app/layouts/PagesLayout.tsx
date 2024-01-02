import React, { ReactNode } from "react";
import Head from "next/head";

import Appbar from "app/components/legacy_appbar";
import Footer from "app/components/footer";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Slyderz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Appbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

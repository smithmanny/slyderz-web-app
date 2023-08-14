import React, { ReactNode } from "react";
import Head from "next/head";
import { useFlags } from "flagsmith/react";

import Appbar from "app/core/components/appbar";
import Footer from "app/core/components/footer";
import BetaLayout from "./BetaLayout";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const flags = useFlags(["is_beta"]);
  console.log("flags", flags);

  return (
    <>
      <Head>
        <title>{title || "Slyderz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {flags.is_beta.enabled ? (
        <BetaLayout>{children}</BetaLayout>
      ) : (
        <React.Fragment>
          <Appbar />
          <main>{children}</main>
          <Footer />
        </React.Fragment>
      )}
    </>
  );
};

export default Layout;

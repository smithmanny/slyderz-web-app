import { ReactNode } from "react";

import Appbar from "app/beta/components/Appbar";

type BetaLayoutProps = {
  children: ReactNode;
};

const BetaLayout = ({ children }: BetaLayoutProps) => {
  return (
    <>
      <Appbar />
      <main>{children}</main>
    </>
  );
};

export default BetaLayout;

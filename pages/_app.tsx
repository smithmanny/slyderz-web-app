import React, { Suspense, useEffect, ReactNode } from "react";
import { Roboto_Slab } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import type { AppProps } from "next/app";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

import { trpc } from "server/utils/trpc";
import { theme } from "integrations/material-ui";
import { RudderStack } from "app/utils/getRudderstack";

import Box from "app/components/shared/Box";
import CircularProgress from "app/components/shared/CircularProgress";

import "app/styles/base.css";

const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function LoadingIcon() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={250} />
    </Box>
  );
}

type MyAppProps = Omit<AppProps, "Component"> & {
  Component: AppProps["Component"] & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
};
function Slyderz({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  useEffect(() => {
    RudderStack.getInstance();
  }, []);
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate={true}
    >
      <FlagsmithProvider
        options={{
          environmentID: "27oW57Gst9Us3H7ogNaAzU",
        }}
        flagsmith={flagsmith}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingIcon />}>
            {getLayout(
              <div className={roboto.className}>
                <Component {...pageProps} />
              </div>,
            )}
          </Suspense>
        </ThemeProvider>
      </FlagsmithProvider>
    </SnackbarProvider>
  );
}

export default trpc.withTRPC(Slyderz);

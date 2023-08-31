import React, { Suspense, useEffect, ReactNode } from "react";
import { Roboto_Serif } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import type { AppProps } from "next/app";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

import { trpc } from "server/utils/trpc";
import store from "integrations/redux";
import { theme } from "integrations/material-ui";
import { useAppDispatch } from "integrations/redux";
import { fetchUserData } from "integrations/redux/reducers/userReduer";

import Box from "app/core/components/shared/Box";
import CircularProgress from "app/core/components/shared/CircularProgress";

import "app/styles/base.css";

const roboto = Roboto_Serif({ subsets: ["latin"] });

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

function SlyderzWrapper({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .catch((err) => console.log("Failed fetching initial data", err));
  }, [dispatch]);

  return children;
}

type MyAppProps = Omit<AppProps, "Component"> & {
  Component: AppProps["Component"] & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
};
function Slyderz({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <Provider store={store}>
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
              <SlyderzWrapper>
                {getLayout(
                  <div className={roboto.className}>
                    <Component {...pageProps} />
                  </div>,
                )}
              </SlyderzWrapper>
            </Suspense>
          </ThemeProvider>
        </FlagsmithProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default trpc.withTRPC(Slyderz);

import React, { Suspense, useEffect } from "react";
import { Roboto_Serif } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { trpc } from "server/utils/trpc";
import store from "integrations/redux";
import { theme } from "integrations/material-ui";
import { useAppDispatch } from "integrations/redux";
import { fetchUserData } from "integrations/redux/reducers/userReduer";

import LoginForm from "app/auth/components/LoginForm";
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
  // TODO:: Add session and check for user
  const userId = 1;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData())
        .unwrap()
        .catch((err) => console.log("Failed fetching initial data", err));
    }
  }, [userId, dispatch]);
  return children;
}

function Slyderz({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        preventDuplicate={true}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingIcon />}>
            <SlyderzWrapper>
              {getLayout(
                <div className={roboto.className}>
                  <Component {...pageProps} />
                </div>
              )}
            </SlyderzWrapper>
          </Suspense>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default trpc.withTRPC(Slyderz);

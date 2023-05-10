import React, { Suspense, useEffect } from "react";
import { useSession } from "@blitzjs/auth";
import { Roboto_Serif } from "next/font/google";
import { AuthenticationError, AuthorizationError } from "blitz";
import { withBlitz } from "app/blitz-client";
import { useQueryErrorResetBoundary } from "@blitzjs/rpc";
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
} from "@blitzjs/next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

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
  const session = useSession();
  const dispatch = useAppDispatch();
  const userId = session.userId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData())
        .unwrap()
        .catch((err) => console.log("Failed fetching initial data", err));
    }
  }, [userId, dispatch]);
  return children;
}

export default withBlitz(function App({ Component, pageProps }: AppProps) {
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
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <Suspense fallback={<LoadingIcon />}>
              <SlyderzWrapper>
                {getLayout(
                  <div className={roboto.className}>
                    <Component {...pageProps} />
                  </div>
                )}
              </SlyderzWrapper>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
});

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

import React, { Suspense } from "react";
import { AuthenticationError, AuthorizationError } from 'blitz'
import { withBlitz } from "app/blitz-client";
import { useQueryErrorResetBoundary } from "@blitzjs/rpc";
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
} from "@blitzjs/next";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";

import store from "integrations/redux";
import { theme } from "integrations/material-ui";

import LoginForm from "app/auth/components/LoginForm"
import Box from "app/core/components/shared/Box"
import CircularProgress from "app/core/components/shared/CircularProgress"

export { reportWebVitals } from 'next-axiom';

function LoadingIcon() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress size={250} />
    </Box>
  )
}

export default withBlitz(function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <Suspense fallback={<LoadingIcon />}>
              {getLayout(<Component {...pageProps} />)}
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
});

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

import React, { Suspense } from "react";
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";

import store from "integrations/redux";
import { theme } from "integrations/material-ui";

import LoginForm from "app/auth/components/LoginForm"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Suspense fallback="Loading">
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <ErrorBoundary
              FallbackComponent={RootErrorFallback}
              onReset={useQueryErrorResetBoundary().reset}
            >
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </Suspense>
  );
}

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

import React, { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import TagManager from "react-gtm-module";
import { Provider } from "react-redux";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";

import { theme } from "../src/libs/material-ui";
import SEO from "../next-seo.config";
import store from "../src/libs/redux";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // Initialize Google Tag Manager
    const tagManagerArgs = {
      gtmId: "GTM-MRFDR6F",
    };
    TagManager.initialize(tagManagerArgs);
  });
  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <Provider store={store}>
            <DefaultSeo {...SEO} />
            <CssBaseline />
            <Component {...pageProps} />
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;

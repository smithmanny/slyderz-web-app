import React from "react";
import App from "next/app";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import CssBaseline from "@material-ui/core/CssBaseline";
import { DefaultSeo } from "next-seo";
import TagManager from "react-gtm-module";

import CheckoutCartProvider from "../src/components/shared/CheckoutCartProvider";
import WindowProvider from "../src/components/shared/WindowProvider";
import { theme } from "../src/libs/material-ui";
import SEO from "../next-seo.config";

class MyApp extends App {
  componentDidMount() {
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
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StylesProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <CheckoutCartProvider>
              <WindowProvider>
                <DefaultSeo {...SEO} />
                <CssBaseline />
                <Component {...pageProps} />
              </WindowProvider>
            </CheckoutCartProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default MyApp;

import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { DefaultSeo } from 'next-seo';
import TagManager from 'react-gtm-module';

import { CheckoutCartProvider } from '../src/utils/checkoutCartContext';
import CurrentSessionProviver from '../src/utils/currentSessionContext';
import { theme } from '../src/libs/material-ui';
import withApollo from '../src/utils/withApollo';
import SEO from '../next-seo.config';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // Initialize Google Tag Manager
    const tagManagerArgs = {
      gtmId: 'GTM-MRFDR6F'
    };
    TagManager.initialize(tagManagerArgs);
  }
  render() {
    const { apollo, Component, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <StylesProvider>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <CurrentSessionProviver>
                <CheckoutCartProvider>
                  <DefaultSeo {...SEO} />
                  <CssBaseline />
                  <Component {...pageProps} />
                </CheckoutCartProvider>
              </CurrentSessionProviver>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
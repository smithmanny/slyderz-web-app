import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { DefaultSeo } from 'next-seo';
import TagManager from 'react-gtm-module';

import { UserProvider } from '../src/context/userContext';
import { theme } from '../src/libs/material-ui';
import withApollo from '../src/utils/withApollo';
import SEO from '../next-seo.config';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let user = null;

    // Get user from cookie and set global user
    if (ctx.req && ctx.req.headers.cookie) {
      const slyderzCookie = ctx.req.headers.cookie
        .split(';')
        .find(t => t.trim().includes('_slyderz'));
      /* eslint-disable prefer-destructuring */
      if (slyderzCookie) {
        user = slyderzCookie.split('=')[1];
        pageProps.user = user;
      }
      /* eslint-enable prefer-destructuring */
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

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
              <UserProvider value={pageProps.user}>
                <DefaultSeo {...SEO} />
                <CssBaseline />
                <Component {...pageProps} />
              </UserProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

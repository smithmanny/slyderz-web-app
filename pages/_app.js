import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DefaultSeo } from 'next-seo';
import TagManager from 'react-gtm-module';

import { theme } from '../src/libs/material-ui';
import withApollo from '../src/utils/withApollo';
import SEO from '../next-seo.config';

const tagManagerArgs = {
  gtmId: 'GTM-MRFDR6F'
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
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
    TagManager.initialize(tagManagerArgs);
  }

  render() {
    const { apollo, Component, pageProps } = this.props;

    return (
      <Container>
        <DefaultSeo {...SEO} />

        <ApolloProvider client={apollo}>
          <StylesProvider>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline />
                <Component {...pageProps} />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </StylesProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);

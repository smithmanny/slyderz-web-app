import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NextSeo from 'next-seo';

import theme from '../utils/theme';
import withApollo from '../utils/withApollo';
import SEO from '../next-seo.config';

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
  }

  render() {
    const { apollo, Component, pageProps } = this.props;

    return (
      <Container>
        <NextSeo config={SEO} />

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

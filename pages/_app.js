import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
/* eslint-disable import/first */
import '../utils/material';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../utils/theme';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Slyderz</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>

        <CssBaseline />

        <ThemeProvider theme={theme}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

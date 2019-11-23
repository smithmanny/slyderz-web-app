import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DefaultSeo } from 'next-seo';
import TagManager from 'react-gtm-module';

import { CheckoutCartProvider } from '../src/context/checkoutCartContext';
import { theme } from '../src/libs/material-ui';
import withApollo from '../src/utils/withApollo';
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

  constructor(props) {
    super(props);
    this.state = {
      showCartModal: false
    };

    this.handleCartModal = this.handleCartModal.bind(this);
    this.closeCartModal = this.closeCartModal.bind(this);
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

  handleCartModal() {
    this.setState(prev => ({
      showCartModal: prev.showCartModal === false
    }));
  }

  closeCartModal() {
    this.setState({ showCartModal: false });
  }

  render() {
    const { apollo, Component, pageProps } = this.props;
    const functions = {
      handleCartModal: this.handleCartModal,
      closeCartModal: this.closeCartModal
    };

    return (
      <ApolloProvider client={apollo}>
        <StylesProvider>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <CheckoutCartProvider
                value={[this.state.showCartModal, functions]}
              >
                <DefaultSeo {...SEO} />
                <CssBaseline />
                <Component {...pageProps} />
              </CheckoutCartProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

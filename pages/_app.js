import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import getPageContext from '../utils/getPageContext';
import withApollo from '../utils/withApollo';

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

  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const {
      apollo, Component, pageProps,
    } = this.props;

    return (
      <Container>
        <Head>
          <title>Slyderz | Your On-demand Restaurant</title>
        </Head>

        <ApolloProvider client={apollo}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline />
                <Component pageContext={this.pageContext} {...pageProps} />
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);

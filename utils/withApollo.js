import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

import { config } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? config.DEV_URL
        : config.GRAPHQL_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);

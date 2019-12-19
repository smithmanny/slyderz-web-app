import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';

import { config } from '../../config';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    uri:
      process.env.NODE_ENV === 'development'
        ? config.DEV_URL
        : process.env.PROD_URL,
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

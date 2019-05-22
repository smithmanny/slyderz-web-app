import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

import { config } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? config.DEV_URL
        : process.env.PROD_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers: {
          ...headers,
          Authorization: 'Bearer GTC8OArCuIy4tRt92u3frGSEAQIXtB8Z'
        }
      });
    }
  });
}

export default withApollo(createClient);

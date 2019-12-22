import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    uri:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
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

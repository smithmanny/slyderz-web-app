import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

function createClient({ headers }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.GRAPHQL_URL,
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

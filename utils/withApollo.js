import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo'

import configs from '../configs'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? configs.DEV_URL : configs.GRAPHQL_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
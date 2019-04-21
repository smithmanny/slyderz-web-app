import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo'

import configs from '../configs'

export default withApollo(({ headers }) => {
  const ssrMode = !process.browser

  const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? configs.DEV_URL : configs.GRAPHQL_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  })

  const wsLink = !ssrMode && new WebSocketLink({
    uri: configs.WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        // authorization: headers.authorization
      }
    }
  })

  const contextLink = setContext(
    async () => ({
      headers: {
        // authorization: headers.authorization
      }
    })
  )
  
  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  );

  const cache = new InMemoryCache({
    dataIdFromObject: ({ id, __typename }) =>
      id && __typename ? __typename + id : null
  });

  const stateLink = withClientState({
    cache,
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected
            },
          };
          cache.writeData({ data });
          return null;
        },
      },
    }
  });

  let link = ApolloLink.from([stateLink, errorLink, contextLink, httpLink])

  if (!ssrMode) {
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      link
    )
  }

  return new ApolloClient({ link, ssrMode, cache })
})
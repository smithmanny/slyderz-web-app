import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
}

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  const cache = new InMemoryCache().restore(initialState || {});
  const httpLink = createHttpLink({
    uri: 'https://api-slyderz-dev.herokuapp.com/v1alpha1/graphql',
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'X-Hasura-admin-secret': 'hgasslyderz',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    defaultOptions,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    ssrForceFetchDelay: 100,
    link: authLink.concat(httpLink),
    cache,
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

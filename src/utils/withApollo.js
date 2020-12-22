import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, headers }) =>
    new ApolloClient({
      connectToDevTools: process.browser,
      ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
      cache: new InMemoryCache().restore(initialState || {}),
      uri: process.env.GRAPHQL_URL,
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
    }),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  }
);

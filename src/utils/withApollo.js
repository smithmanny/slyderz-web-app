import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      uri: process.env.DATABASE_URL,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: "include"
          },
          headers
        });
      }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);

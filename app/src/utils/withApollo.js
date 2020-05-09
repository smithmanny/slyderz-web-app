import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      uri:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_URL
          : process.env.PROD_URL,
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

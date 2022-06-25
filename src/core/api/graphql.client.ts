import { ApolloClient, InMemoryCache } from '@apollo/client';

const URL =
  'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/graphql';

export const graphQLClient = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
});

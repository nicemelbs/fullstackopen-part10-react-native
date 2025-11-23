import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import Constants from 'expo-constants';
const APOLLO_URI = Constants.expoConfig.extra.APOLLO_URI;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: APOLLO_URI,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

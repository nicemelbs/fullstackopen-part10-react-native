import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import Constants from 'expo-constants';
import { SetContextLink } from '@apollo/client/link/context';

const apolloUri = Constants.expoConfig.extra.APOLLO_URI;
const httpLink = new HttpLink({ uri: apolloUri });

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async (prevContext) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...prevContext.headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.error(e);
      return {
        headers: { ...prevContext.headers },
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import Constants from 'expo-constants';
import { SetContextLink } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const apolloUri = Constants.expoConfig.extra.APOLLO_URI;
const httpLink = new HttpLink({ uri: apolloUri });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

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
    cache,
  });
};

export default createApolloClient;

import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import theme from './theme';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import AppBarPressable from './AppBarPressable';

const styles = StyleSheet.create({
  container: {
    ...theme.appBar.container,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    columnGap: 10,
  },
  tab: {
    ...theme.appBar.tab,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  linkText: {
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, { variables: { includeReviews: false } });
  const loggedInUser = data?.me?.username ?? null;

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarPressable linkTo="/" style={styles.tab}>
          <View>
            <Text style={styles.linkText}>Repositories</Text>
          </View>
        </AppBarPressable>

        {!loggedInUser && (
          <>
            <AppBarPressable linkTo="/signin" style={styles.tab}>
              <View>
                <Text style={styles.linkText}>Sign in</Text>
              </View>
            </AppBarPressable>
            <AppBarPressable linkTo="/signup" style={styles.tab}>
              <View>
                <Text style={styles.linkText}>Sign up</Text>
              </View>
            </AppBarPressable>
          </>
        )}

        {loggedInUser && (
          <>
            <AppBarPressable linkTo="/review" style={styles.tab}>
              <View>
                <Text style={styles.linkText}>Review</Text>
              </View>
            </AppBarPressable>
            <AppBarPressable linkTo="/reviews" style={styles.tab}>
              <View>
                <Text style={styles.linkText}>My Reviews</Text>
              </View>
            </AppBarPressable>
            <AppBarPressable onPress={handleSignOut} style={styles.tab}>
              <View>
                <Text style={styles.linkText}>Sign Out</Text>
              </View>
            </AppBarPressable>
            <View style={styles.tab}>
              <Text>{loggedInUser}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

import RepositoryItem from './RepositoryItem';

import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import Text from './Text';
import { Pressable, FlatList, Linking, StyleSheet, View } from 'react-native';
import theme, { onedark } from './theme';
import { format } from 'date-fns';
import { colord } from 'colord';
import ReviewItem from './Reviews/ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  headComponent: {
    backgroundColor: colord(onedark.colors.black).darken(0.05).toHex(),
    button: {
      backgroundColor: onedark.colors.green,
      alignSelf: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      text: {
        color: onedark.colors.black,
      },
    },

    paddingBottom: 10,
    wrapper: {
      backgroundColor: onedark.colors.black,
      paddingBottom: 10,
    },
  },
});

const ListHead = ({ item }) => {
  return (
    <View style={styles.headComponent}>
      <View style={styles.headComponent.wrapper}>
        <RepositoryItem item={item} />
        <Pressable
          style={styles.headComponent.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.headComponent.button.text}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.repository?.reviews?.edges?.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} header={item.user.username} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <ListHead item={data?.repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
export default SingleRepositoryItem;

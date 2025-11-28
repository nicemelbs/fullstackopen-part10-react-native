import RepositoryItem from './RepositoryItem';

import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import Text from './Text';
import {
  Pressable,
  FlatList,
  Linking,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import theme, { onedark } from './theme';
import { format } from 'date-fns';
import { colord } from 'colord';
import ReviewItem from './Reviews/ReviewItem';
import { ActivityIndicator } from 'react-native-paper';
import useGetRepositoryById from '../hooks/useGetRepositoryById';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  headComponent: {
    backgroundColor: colord(onedark.colors.black).darken(0.05).toHex(),
    button: {
      backgroundColor: onedark.colors.green,
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 8,
      text: {
        color: colord(onedark.colors.white).lighten(0.1).toHex(),
        textTransform: 'uppercase',
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
        <View style={styles.headComponent.button}>
          <Button
            title="Open in GitHub"
            onPress={() => Linking.openURL(item.url)}
            color={colord(onedark.colors.blue).darken(0.1).toHex()}
          />
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryItem = () => {
  const { id } = useParams();

  const { repository, fetchMore, error, networkStatus, loading, refetch } =
    useGetRepositoryById({
      id,
      reviewFirst: 5,
    });

  const reviews = repository?.reviews?.edges?.map((e) => e.node) ?? [];

  const loadingMore = networkStatus === 3;
  const handleEndReached = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} header={item.user.username} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>
        repository ? <ListHead item={repository} /> : <ActivityIndicator />
      }
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReached}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
export default SingleRepositoryItem;

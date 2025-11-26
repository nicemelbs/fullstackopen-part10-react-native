import RepositoryItem from './RepositoryItem';

import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import Text from './Text';
import { Pressable, FlatList, Linking, StyleSheet, View } from 'react-native';
import theme, { onedark } from './theme';
import { format } from 'date-fns';
import { colord } from 'colord';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: onedark.colors.black,
    columnGap: 10,
    padding: 10,
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
  reviewDetails: {
    flexDirection: 'column',
    rowGap: 10,
    flexShrink: 1,
    reviewText: {
      fontSize: theme.fontSizes.body,
    },
  },
  reviewHeading: {
    username: {
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes.subheading,
      color: onedark.colors.purple,
    },
    date: {
      color: colord(onedark.colors.white).darken(0.3).toHex(),
    },
  },
  reviewRating: {
    height: 50,
    width: 50,
    text: {
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      color: onedark.colors.green,
    },
    borderColor: onedark.colors.green,
    borderWidth: 2,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem} testID="reviewItem">
      <View style={styles.reviewRating}>
        <Text style={styles.reviewRating.text}>{review.rating}</Text>
      </View>
      <View style={styles.reviewDetails}>
        <View style={styles.reviewHeading}>
          <Text style={styles.reviewHeading.username}>
            {review.user.username}
          </Text>
          <Text style={styles.reviewHeading.date}>
            {format(review.createdAt, 'dd.MM.yyyy')}
          </Text>
        </View>
        <Text style={styles.reviewDetails.reviewText}>{review.text}</Text>
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
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.repository?.reviews?.edges?.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <ListHead item={data?.repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
export default SingleRepositoryItem;

import { ME } from '../../graphql/queries';
import Text from '../Text';
import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const { data } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  const reviews = data?.me?.reviews?.edges?.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} header={item.repository.fullName} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
export default Reviews;

import { ME } from '../../graphql/queries';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client/react';
import ReviewItem from './ReviewItem';
import { onedark } from '../theme';
import { useNavigate } from 'react-router-native';
import { colord } from 'colord';
import { DELETE_REVIEW } from '../../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    columnGap: 10,
    backgroundColor: onedark.colors.black,
    paddingVertical: 10,
    marginVertical: 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewWrapper = ({ review, header, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <View>
      <ReviewItem review={review} header={header} />

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigate(`/${review.repository.id}`)}
          color={colord(onedark.colors.blue).darken(0.1).toHex()}
          title="View repository"
        />
        <Button
          color={colord(onedark.colors.red).darken(0.1).toHex()}
          title="Delete review"
          onPress={() =>
            handleDelete(review.id, review.repository.fullName, review.rating)
          }
        />
      </View>
    </View>
  );
};

const Reviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => refetch(),
    onError: (error) => console.error(error),
  });

  const reviews = data?.me?.reviews?.edges?.map((e) => e.node) ?? [];

  const handleDelete = (id, fullName, rating) => {
    Alert.alert(
      `Delete review: ${fullName}, ${rating}`,
      'Are you sure you want to delete this review?',
      [
        { text: 'No', onPress: () => console.log('delete canceled') },

        {
          text: 'Yes',
          onPress: () => {
            deleteReview({ variables: { deleteReviewId: id } });
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewWrapper
          review={item}
          header={item.repository.fullName}
          handleDelete={handleDelete}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
export default Reviews;

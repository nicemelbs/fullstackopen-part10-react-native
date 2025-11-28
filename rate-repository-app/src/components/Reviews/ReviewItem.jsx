import { StyleSheet, View } from 'react-native';
import Text from '../Text';

import { format } from 'date-fns';
import theme, { onedark } from '../theme';
import { colord } from 'colord';

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: onedark.colors.black,
    columnGap: 10,
    padding: 10,
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
    text: {
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

const ReviewItem = ({ review, header }) => {
  return (
    <View style={styles.reviewItem} testID="reviewItem">
      <View style={styles.reviewRating}>
        <Text style={styles.reviewRating.text}>{review.rating}</Text>
      </View>
      <View style={styles.reviewDetails}>
        <View style={styles.reviewHeading}>
          <Text style={styles.reviewHeading.text}>{header}</Text>
          <Text style={styles.reviewHeading.date}>
            {format(review.createdAt, 'dd.MM.yyyy')}
          </Text>
        </View>
        <Text style={styles.reviewDetails.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;

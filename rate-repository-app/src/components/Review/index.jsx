import { useApolloClient } from '@apollo/client/react';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../../hooks/useCreateReview';
const Review = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const [postReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const review = { repositoryName, ownerName, rating, text };
      await postReview(review);

      //only works because id is in this form
      navigate(`/${ownerName}.${repositoryName}`);
      apolloClient.resetStore();
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: '',
  };

  return <ReviewForm initialValues={initialValues} onSubmit={onSubmit} />;
};

export default Review;

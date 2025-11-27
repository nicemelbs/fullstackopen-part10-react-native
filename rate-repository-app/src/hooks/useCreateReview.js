import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const postReview = async ({ rating, repositoryName, ownerName, text }) => {
    const review = { rating: Number(rating), repositoryName, ownerName, text };
    const res = await mutate({ variables: { review } });

    return res;
  };

  return [postReview, result];
};

export default useCreateReview;

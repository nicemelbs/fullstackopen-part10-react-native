import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useGetRepositoryById = (variables) => {
  const { data, networkStatus, error, fetchMore, loading, refetch, ...result } =
    useQuery(GET_REPOSITORY_BY_ID, {
      variables,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        reviewAfter: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          repository: {
            ...prev.repository,
            reviews: {
              ...prev.repository.reviews,
              edges: [
                ...prev.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
              pageInfo: fetchMoreResult.repository.reviews.pageInfo,
              __typename: prev.repository.reviews.__typename,
            },
          },
        };
      },
    });
  };

  return {
    repository: data?.repository,
    error,
    loading,
    refetch,
    networkStatus,
    fetchMore: handleFetchMore,
    ...result,
  };
};
export default useGetRepositoryById;

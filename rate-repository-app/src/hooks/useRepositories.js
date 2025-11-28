import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, networkStatus, error, fetchMore, loading, refetch, ...result } =
    useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables,
    });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          repositories: {
            ...prev.repositories,
            edges: [
              ...prev.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
            pageInfo: fetchMoreResult.repositories.pageInfo,
          },
        };
      },
    });
  };

  return {
    repositories: data?.repositories,
    error,
    loading,
    refetch,
    networkStatus,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;

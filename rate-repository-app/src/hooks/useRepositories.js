import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

// const BASE_URL = 'http://192.168.0.10:5000';
// const BASE_URL = 'https://homoeomorphous-unfrequently-kathern.ngrok-free.dev';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data.repositories, error, loading, refetch };
};

export default useRepositories;

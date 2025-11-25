import useRepositories from '../hooks/useRepositories';
import RepositoryList from './RepositoryList';

const RepositoryListContainer = () => {
  const { repositories, loading } = useRepositories();
  return <RepositoryList repositories={repositories} loading={loading} />;
};

export default RepositoryListContainer;

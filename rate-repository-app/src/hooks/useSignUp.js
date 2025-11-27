import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const user = { username, password };
    const res = await mutate({ variables: { user } });

    return res;
  };

  return [signUp, result];
};

export default useSignUp;

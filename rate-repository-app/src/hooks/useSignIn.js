import { useMutation } from '@apollo/client/react';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const res = await mutate({ variables: { credentials } });

    return res;
  };

  return [signIn, result];
};

export default useSignIn;

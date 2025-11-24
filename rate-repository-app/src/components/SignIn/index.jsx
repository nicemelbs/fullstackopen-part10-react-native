import useSignIn from '../../hooks/useSignIn';
import useAuthStorage from '../../hooks/useAuthStorage';
import SignInForm from './SignInForm';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client/react';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const credentials = { username, password };
      const { data } = await signIn(credentials);

      const accessToken = data?.authenticate?.accessToken ?? '';
      await authStorage.setAccessToken(accessToken);

      navigate(-1);
      apolloClient.resetStore();
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };
  return <SignInForm onSubmit={onSubmit} initialValues={initialValues} />;
};

export default SignIn;

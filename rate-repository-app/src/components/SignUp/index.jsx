import { useNavigate } from 'react-router-native';
import useSignUp from '../../hooks/useSignUp';
import SignUpForm from './SignUpForm';
import { useApolloClient } from '@apollo/client/react';
const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const user = { username, password };
      await signUp(user);

      navigate('/');
      apolloClient.resetStore();
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  return <SignUpForm onSubmit={onSubmit} initialValues={initialValues} />;
};

export default SignUp;

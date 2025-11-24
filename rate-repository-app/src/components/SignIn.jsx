import { View, Button, TextInput, StyleSheet, Platform } from 'react-native';
import { onedark } from './theme';
import { colord } from 'colord';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  form: {
    backgroundColor: onedark.colors.black,
    flexDirection: 'column',
    rowGap: 5,
    padding: 10,
    paddingTop: 15,
  },

  textInput: {
    color: onedark.colors.white,
    borderColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    borderWidth: 2,
    borderRadius: 3,
    padding: 10,
  },

  textInputError: {
    borderColor: onedark.colors.red,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be 5 characters long')
    .required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <TextInput
        placeholderTextColor={colord(onedark.colors.white).darken(0.4).toHex()}
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.textInputError,
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholder="username"
      />
      <Text style={{ color: onedark.colors.red }}>
        {formik.touched.username && formik.errors.username
          ? formik.errors.username
          : ''}
      </Text>
      <TextInput
        placeholderTextColor={colord(onedark.colors.white).darken(0.4).toHex()}
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.textInputError,
        ]}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="password"
      />
      <Text style={{ color: onedark.colors.red }}>
        {formik.touched.password && formik.errors.password
          ? formik.errors.password
          : ''}
      </Text>

      <Button title="Submit" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();

  const authStorage = useAuthStorage();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const credentials = { username, password };
      await signIn(credentials);

      const accessToken = result?.data?.authenticate?.accessToken ?? '';
      await authStorage.setAccessToken({ accessToken });
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

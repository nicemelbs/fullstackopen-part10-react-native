import { Button, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Text from '../Text';
import { visibleErrorMessage } from '../../utils/helpers';

const styles = StyleSheet.create({
  form: theme.form,
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(30, 'Password must be at most 30 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password must match')
    .required('Confirm password is required'),
});

const SignUpForm = ({ onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.form}>
      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.form.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.form.textInputError,
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholder="username"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'username')}
      </Text>
      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.form.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.form.textInputError,
        ]}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="password"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'password')}
      </Text>

      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.form.textInput,
          formik.touched.passwordConfirm &&
            formik.errors.passwordConfirm &&
            styles.form.textInputError,
        ]}
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        placeholder="confirm password"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'passwordConfirm')}
      </Text>
      <Button title="Register" onPress={formik.handleSubmit} />
    </View>
  );
};

export default SignUpForm;

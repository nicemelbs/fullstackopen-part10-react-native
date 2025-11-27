import { View, Button, TextInput, StyleSheet } from 'react-native';
import theme, { onedark } from '../theme';
import { colord } from 'colord';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from '../Text';
const styles = StyleSheet.create({
  // form: {
  //   backgroundColor: onedark.colors.black,
  //   flexDirection: 'column',
  //   rowGap: 5,
  //   padding: 10,
  //   paddingTop: 15,
  // },

  // textInput: {
  //   color: onedark.colors.white,
  //   borderColor: colord(onedark.colors.black).lighten(0.05).toHex(),
  //   borderWidth: 2,
  //   borderRadius: 3,
  //   padding: 10,
  // },

  // textInputError: {
  //   borderColor: onedark.colors.red,
  // },

  form: theme.form,
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
        {formik.touched.username && formik.errors.username
          ? formik.errors.username
          : ''}
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
        {formik.touched.password && formik.errors.password
          ? formik.errors.password
          : ''}
      </Text>

      <Button title="Submit" onPress={formik.handleSubmit} />
    </View>
  );
};

export default SignInForm;

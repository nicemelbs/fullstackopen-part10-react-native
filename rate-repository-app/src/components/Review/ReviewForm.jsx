import { Button, StyleSheet, TextInput, View } from 'react-native';
import Text from '../Text';
import * as yup from 'yup';
import { useFormik } from 'formik';
import theme from '../theme';
import { visibleErrorMessage } from '../../utils/helpers';

const styles = StyleSheet.create({
  form: theme.form,
  reviewTextInput: {
    textAlignVertical: 'top',
    minHeight: 120,
  },
});

const validationSchema = yup.object().shape({
  rating: yup
    .number('Rating must be between 0 and 100 inclusive')
    .min(0, 'Rating must be between 0 and 100 inclusive')
    .max(100, 'Rating must be between 0 and 100 inclusive')
    .required('Rating is required'),
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required("Repository owner's username is required"),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit, initialValues }) => {
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
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.form.textInputError,
        ]}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        placeholder="Repository owner's username"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'ownerName')}
      </Text>
      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.form.textInput,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.form.textInputError,
        ]}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        placeholder="Repository name"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'repositoryName')}
      </Text>
      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.form.textInput,
          formik.touched.rating &&
            formik.errors.rating &&
            styles.form.textInputError,
        ]}
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        placeholder="Rating"
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'rating')}
      </Text>
      <TextInput
        placeholderTextColor={theme.form.placeholder.color}
        style={[
          styles.reviewTextInput,
          styles.form.textInput,
          formik.touched.text &&
            formik.errors.text &&
            styles.form.textInputError,
        ]}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        placeholder="Review"
        multiline
        numberOfLines={6}
      />
      <Text style={styles.form.textInputError}>
        {visibleErrorMessage(formik, 'text')}
      </Text>
      <Button title="Submit Review" onPress={formik.handleSubmit} />
    </View>
  );
};

export default ReviewForm;

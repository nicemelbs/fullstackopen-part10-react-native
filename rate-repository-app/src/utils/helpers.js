export const shorten = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const visibleErrorMessage = (formik, fieldName) => {
  return formik.touched[fieldName] && formik.errors[fieldName]
    ? formik.errors[fieldName]
    : '';
};

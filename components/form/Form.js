import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField } from './SelectGroup';
export { default as TextField } from './TextFieldGroup';

const BasicForm = ({
  children,
  initialValues,
  onSubmit,
  validation,
  ...props
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validation}
    {...props}
  >
    {({
      values,
      errors,
      isSubmitting,
      handleSubmit,
      handleBlur,
      handleChange
    }) => (
      <Form>
        <Grid container spacing={32}>
          {children({
            values,
            errors,
            isSubmitting,
            handleSubmit,
            handleBlur,
            handleChange
          })}
        </Grid>
      </Form>
    )}
  </Formik>
);

BasicForm.propTypes = {
  children: PropTypes.func.isRequired,
  initialValues: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired
};

export default BasicForm;

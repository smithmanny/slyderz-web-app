import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField } from './SelectGroup';

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
        {children({
          values,
          errors,
          isSubmitting,
          handleSubmit,
          handleBlur,
          handleChange
        })}
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

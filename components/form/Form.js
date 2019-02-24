import React from 'react';
import { Formik, Form } from 'formik';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField} from './SelectGroup';

const BasicForm = ({ children, initialValues, onSubmit, validation, ...props }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validation}
      {...props}
    >
      {({ values, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
        <Form>
          {children({ values, errors, isSubmitting, handleSubmit, handleBlur, handleChange })}
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;
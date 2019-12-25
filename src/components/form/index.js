import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/react-hooks';
import { Formik, Form } from 'formik';

export { default as DatePickerField } from './DatePickerGroup';
export { default as TimePickerField } from './TimePickerGroup';
export { default as TextField } from './TextFieldGroup';
export { default as Select } from '@material-ui/core/Select';

const BasicForm = ({ children, defaultValues, refetchQueries, mutate }) => {
  const client = useApolloClient();

  function handleFormSubmit({ setFieldError, setSubmitting, values }) {
    const { toVariables, onCompleted, onSubmit, mutation } = mutate || {};
    const variables = toVariables(values);

    setSubmitting(true);
    // Call custom submit function instead of GraphQL mutation
    if (typeof onSubmit === 'function') {
      return onSubmit(variables);
    }
    // Handle form request with GraphQL
    return client
      .mutate({
        mutation,
        variables,
        refetchQueries
      })
      .then(res => {
        setSubmitting(false);
        if (typeof onCompleted === 'function') {
          onCompleted(res.data);
        }
      })
      .catch(err => {
        console.error(err);
        setFieldError('email', err.message);
        setSubmitting(false);
      });
  }

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={mutate && mutate.validation}
    >
      {({
        errors,
        handleChange,
        isSubmitting,
        setFieldError,
        setSubmitting,
        values,
        validateForm
      }) => (
        <Form
          onSubmit={async e => {
            e.stopPropagation();
            e.preventDefault();
            validateForm();
            await handleFormSubmit({
              setFieldError,
              setSubmitting,
              values
            });
          }}
        >
          {children({ errors, isSubmitting, values, handleChange })}
        </Form>
      )}
    </Formik>
  );
};

BasicForm.defaultProps = {
  refetchQueries: []
};

BasicForm.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  mutate: PropTypes.shape({
    mutation: PropTypes.object,
    onCompleted: PropTypes.func,
    onSubmit: PropTypes.func,
    toVariables: PropTypes.func,
    validation: PropTypes.object
  }),
  refetchQueries: PropTypes.arrayOf(PropTypes.string)
};

export default BasicForm;

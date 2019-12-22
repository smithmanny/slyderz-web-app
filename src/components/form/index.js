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

  async function handleFormSubmit({ values, setSubmitting, validateForm }) {
    const { toVariables, onCompleted, onSubmit, mutation } = mutate || {};
    const variables = toVariables(values);

    // Call custom submit function instead of GraphQL mutation
    if (typeof onSubmit === 'function') {
      return onSubmit(variables);
    }
    // Handle form request with GraphQL
    console.log({ values });
    await validateForm();
    try {
      client
        .mutate({
          mutation,
          variables,
          refetchQueries: [{ query: [...refetchQueries] }]
        })
        .then(res => {
          setSubmitting(false);
          if (typeof onCompleted === 'function') {
            onCompleted(res);
          }
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Formik initialValues={defaultValues} validationSchema={mutate.validation}>
      {({ errors, values, handleChange, setSubmitting, validateForm }) => (
        <Form
          onSubmit={async e => {
            e.stopPropagation();
            e.preventDefault();
            await handleFormSubmit({
              values,
              setSubmitting,
              validateForm
            });
          }}
        >
          {children({ errors, values, handleChange })}
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

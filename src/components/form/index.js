import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/react-hooks';
import { Formik, Form } from 'formik';

export { default as DatePickerField } from './DatePickerGroup';
export { default as TimePickerField } from './TimePickerGroup';
export { default as TextField } from './TextFieldGroup';
export { default as Select } from '@material-ui/core/Select';

const BasicForm = ({
  children,
  defaultValues,
  refetchQueries,
  mutate,
  validate
}) => {
  const client = useApolloClient();

  function handleFormSubmit({ values, setSubmitting }) {
    const { toVariables, onCompleted, onSubmit, mutation } = mutate || {};
    const variables = toVariables(values);

    // Call custom submit function instead of GraphQL mutation
    if (typeof onSubmit === 'function') {
      return onSubmit(variables);
    }
    // Handle mutation with GraphQL
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Formik initialValues={defaultValues} validate={validate}>
      {({ values, handleChange, handleSubmit, setSubmitting }) => (
        <Form
          onSubmit={async e => {
            e.stopPropagation();
            e.preventDefault();
            await handleFormSubmit({ values, setSubmitting });
          }}
        >
          {children({ values, handleChange, handleSubmit })}
        </Form>
      )}
    </Formik>
  );
};

BasicForm.defaultProps = {
  refetchQueries: []
};

BasicForm.propTypes = {
  children: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  mutate: PropTypes.shape({
    mutation: PropTypes.func,
    onCompleted: PropTypes.func,
    onSubmit: PropTypes.func,
    toVariables: PropTypes.func
  }),
  refetchQueries: PropTypes.arrayOf(PropTypes.string),
  validate: PropTypes.func
};

export default BasicForm;

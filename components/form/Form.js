import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField } from './SelectGroup';
export { default as TextField } from './TextFieldGroup';
export { default as SubmitButton } from './SubmitButton';

const BasicForm = ({
  children,
  defaultValues,
  onSubmit,
  mutation,
  validation,
  ...props
}) => (
  <ApolloConsumer>
    {client => {
      function handleFormSubmit({ setSubmitting, values }) {
        // Handle onSubmit inside component that called it
        if (typeof onSubmit === 'function' && !mutation) {
          onSubmit(values);
        }

        console.log(values);

        if (mutation) {
          client.mutate({
            mutation,
            variables: values
          });
          setSubmitting();
        }
      }

      return (
        <Formik
          initialValues={defaultValues}
          validationSchema={validation}
          {...props}
        >
          {({
            values,
            errors,
            isSubmitting,
            handleSubmit,
            handleBlur,
            handleChange,
            setSubmitting
          }) => (
            <Form
              onSubmit={e => {
                e.stopPropagation();
                e.preventDefault();
                handleFormSubmit({ setSubmitting, values });
              }}
            >
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
    }}
  </ApolloConsumer>
);

BasicForm.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape(),
  onSubmit: PropTypes.func,
  mutation: PropTypes.func,
  validation: PropTypes.func
};

export default BasicForm;

import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';

import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';
import DisplayError from '../DisplayError';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField } from './SelectGroup';
export { default as TextField } from './TextFieldGroup';
export { default as SubmitButton } from './SubmitButton';

const BasicForm = ({
  children,
  defaultValues,
  customSubmit,
  mutate,
  validation
}) => {
  const [serverError, setServerError] = React.useState(null);
  return (
    <ApolloConsumer>
      {client => {
        function handleSubmit({ setSubmitting, variables }) {
          if (typeof customSubmit === 'function') {
            customSubmit();
          }

          client
            .mutate({
              mutation: mutate.mutation,
              variables,
              refetchQueries: [{ query: currentUserQuery }]
            })
            .then(() => {
              setSubmitting(false);
              mutate.onCompleted();
            })
            .catch(error => {
              setServerError(error);
            });
        }

        return (
          <Formik initialValues={defaultValues} validationSchema={validation}>
            {({
              values,
              errors,
              isSubmitting,
              handleBlur,
              handleChange,
              setSubmitting
            }) => (
              <Form
                onSubmit={e => {
                  e.stopPropagation();
                  e.preventDefault();

                  const variables = mutate.variables(values);
                  handleSubmit({ setSubmitting, variables });
                }}
              >
                <React.Fragment>
                  <DisplayError error={serverError} />
                  <Grid container spacing={32}>
                    {children({
                      values,
                      errors,
                      isSubmitting,
                      handleBlur,
                      handleChange
                    })}
                  </Grid>
                </React.Fragment>
              </Form>
            )}
          </Formik>
        );
      }}
    </ApolloConsumer>
  );
};

BasicForm.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape(),
  customSubmit: PropTypes.func,
  mutate: PropTypes.shape({
    mutation: PropTypes.func,
    variables: PropTypes.func,
    onCompleted: PropTypes.func
  }),
  validation: PropTypes.func
};

export default BasicForm;

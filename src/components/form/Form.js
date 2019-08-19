import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form } from 'formik';

import { Grid } from '../core';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';
import DisplayError from '../DisplayError';

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
        const { onCompleted, mutation } = mutate || {};

        function handleSubmit({ setSubmitting, variables }) {
          // Handle onSubmit (customSubmit) inside component calling it
          if (typeof customSubmit === 'function') {
            customSubmit();
          }

          // Handle mutation with GraphQL and refetch currentUser
          client
            .mutate({
              mutation,
              variables,
              refetchQueries: [{ query: currentUserQuery }]
            })
            .then(res => {
              setSubmitting(false);
              if (typeof onCompleted === 'function') {
                onCompleted(res);
              }
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

                  // Pass form values and custom values declared inside component
                  const variables = mutate.variables(values);
                  handleSubmit({ setSubmitting, variables });
                }}
              >
                <React.Fragment>
                  <DisplayError error={serverError} />
                  <Grid container spacing={3}>
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
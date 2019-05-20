import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Query } from 'react-apollo';

import Layout from '../components/Layout';
import Section from '../components/shared/Section';
import Form from '../components/form/Form';
import Text from '../components/shared/Text';
import signupChefMutation from '../lib/gql/mutation/root/signupChefMutation.gql';
import ApplyForm from '../components/chef/ApplyForm';
import currentUserQuery from '../lib/gql/query/user/currentUserQuery.gql';

const Apply = props => {
  const [successMessage, setSuccessMessage] = React.useState(null);
  return (
    <Query query={currentUserQuery}>
      {({ data, loading }) => {
        if (loading) return 'Loading...';

        const user = data && data.me;
        return (
          <Layout>
            <Section>
              <Grid item xs={12}>
                <Text type="h2" align="center" gutterBottom>
                  Become a Chef
                </Text>
                <Text type="body1" align="center" color="inherit" gutterBottom>
                  {successMessage}
                </Text>
                {user && user.isChef === 'PENDING' && (
                  <Text
                    type="body1"
                    align="center"
                    color="inherit"
                    gutterBottom
                  >
                    {successMessage ||
                      "Your application has been received! We'll contact you with further instructions."}
                  </Text>
                )}
              </Grid>
              {user ? (
                <Form
                  defaultValues={{
                    address1: user.address1,
                    address2: user.address2,
                    email: user.email,
                    city: user.city,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    state: user.state,
                    postalCode: user.postalCode
                  }}
                  mutate={{
                    mutation: signupChefMutation,
                    variables: values => ({
                      ...values,
                      postalCode: Number(values.postalCode)
                    }),
                    onCompleted: ({ res }) => {
                      setSuccessMessage(res.signupChef.message);
                    }
                  }}
                >
                  {({ values, handleChange }) => (
                    <ApplyForm
                      values={values}
                      handleChange={handleChange}
                      user={user}
                    />
                  )}
                </Form>
              ) : (
                <Form
                  mutate={{
                    mutation: signupChefMutation,
                    variables: values => ({
                      ...values,
                      postalCode: Number(values.postalCode)
                    }),
                    onCompleted: ({ res }) => {
                      setSuccessMessage(res.signupChef.message);
                    }
                  }}
                >
                  {({ values, handleChange }) => (
                    <ApplyForm
                      values={values}
                      handleChange={handleChange}
                      user={user}
                    />
                  )}
                </Form>
              )}
            </Section>
          </Layout>
        );
      }}
    </Query>
  );
};

export default Apply;

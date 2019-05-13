import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import Layout from '../components/Layout';
import Section from '../components/shared/Section';
import Form, { TextField, SubmitButton } from '../components/form/Form';
import Text from '../components/shared/Text';
import signupSlyderMutation from '../lib/gql/mutation/root/signupSlyderMutation.gql';

const styles = theme => ({
  cancel: {
    margin: 'auto 0',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
});

const Events = ({ classes, user }) => {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const {
    address1,
    address2,
    email,
    city,
    firstName,
    lastName,
    state,
    postalCode,
    isSlyder
  } = user || {};
  return (
    <Layout>
      <Section>
        <Grid item xs={12}>
          <Text type="h2" align="center" gutterBottom>
            Become a Slyder
          </Text>
          <Text type="body1" align="center" color="inherit" gutterBottom>
            {successMessage}
          </Text>
          {isSlyder === 'PENDING' && (
            <Text type="body1" align="center" color="inherit" gutterBottom>
              {successMessage ||
                "Your application has been received! We'll contact you with further instructions."}
            </Text>
          )}
        </Grid>
        <Form
          defaultValues={{
            address1,
            address2,
            email,
            city,
            firstName,
            lastName,
            state,
            postalCode
          }}
          mutate={{
            mutation: signupSlyderMutation,
            variables: values => ({
              ...values,
              postalCode: Number(values.postalCode)
            }),
            onCompleted: ({ data }) => {
              setSuccessMessage(data.signupSlyder.message);
            }
          }}
        >
          {({ values, handleChange }) => (
            <React.Fragment>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={values.email}
                disabled={!!user}
              />
              <TextField
                md={6}
                variant="outlined"
                label="First Name"
                name="firstName"
                autoComplete="name"
                onChange={handleChange}
                value={values.firstName}
                disabled={!!user}
              />
              <TextField
                md={6}
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                disabled={!!user}
              />
              <TextField
                variant="outlined"
                label="Address"
                name="address1"
                autoComplete="address-1"
                onChange={handleChange}
                value={values.address1}
              />
              <TextField
                variant="outlined"
                label="P.O. Box"
                name="address2"
                autoComplete="address-2"
                onChange={handleChange}
                value={values.address2}
              />
              <TextField
                variant="outlined"
                label="City"
                name="city"
                autoComplete="city"
                onChange={handleChange}
                value={values.city}
              />
              <TextField
                xs={6}
                variant="outlined"
                label="State"
                name="state"
                autoComplete="state"
                onChange={handleChange}
                value={values.state}
              />
              <TextField
                xs={6}
                variant="outlined"
                label="Zip Code"
                name="postalCode"
                autoComplete="postal-code"
                onChange={handleChange}
                value={values.postalCode}
              />
              <SubmitButton xs={4} md={2} disabled={isSlyder === 'PENDING'}>
                Submit
              </SubmitButton>
              <Link href="/">
                <a className={classes.cancel}>cancel</a>
              </Link>
            </React.Fragment>
          )}
        </Form>
      </Section>
    </Layout>
  );
};

Events.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(Events);

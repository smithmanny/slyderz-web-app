import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Section from '../components/shared/Section';
import Form, { TextField, SubmitButton } from '../components/form/Form';
import Text from '../components/shared/Text';
import updateAddressSettingsMutation from '../lib/gql/mutation/settings/UpdateAddressSettingsMutation.gql';

const styles = theme => ({
  cancel: {
    margin: 'auto 0',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
});

const Apply = ({ classes, user }) => {
  const {
    address1,
    address2,
    email,
    city,
    firstName,
    lastName,
    state,
    postalCode
  } = user;
  return (
    <Layout>
      <Section>
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
            mutation: updateAddressSettingsMutation,
            variables: values => ({
              ...values,
              postalCode: Number(values.postalCode)
            })
          }}
        >
          {({ values, handleChange }) => (
            <React.Fragment>
              <Grid item xs={12}>
                <Text type="h2" align="center" gutterBottom>
                  Become a Slyder
                </Text>
              </Grid>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={values.email}
              />
              <TextField
                md={6}
                variant="outlined"
                label="First Name"
                name="firstName"
                autoComplete="name"
                onChange={handleChange}
                value={values.firstName}
              />
              <TextField
                md={6}
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
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
              <SubmitButton xs={4}>Submit</SubmitButton>
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

Apply.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(Apply);

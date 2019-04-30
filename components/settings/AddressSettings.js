import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { isInteger } from 'formik';
import Divider from '../shared/Divider';
import Form, { TextField, SubmitButton } from '../form/Form';
import Text from '../shared/Text';
import addressSettingsMutation from '../../lib/gql/mutation/settings/AddressSettingsMutation.gql';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 5
  },
  form: {
    margin: 'auto'
  },
  settingSection: {
    marginTop: theme.spacing.unit * 2
  }
});

const AddressSettings = ({ classes, user }) => {
  const { address1, address2, city, state, postalCode } = user;
  return (
    <Grid item xs={6} className={classes.form}>
      <Card className={classes.card}>
        <CardContent>
          <Form
            defaultValues={{ address1, address2, city, state, postalCode }}
            mutate={{
              mutation: addressSettingsMutation,
              variables: values => ({
                ...values,
                postalCode: Number(values.postalCode)
              })
            }}
          >
            {({ values, handleChange }) => (
              <React.Fragment>
                <Grid item xs={12}>
                  <Text type="h4" className={classes.settingSection}>
                    Manage Your Address
                  </Text>
                  <Divider />
                </Grid>
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
                <SubmitButton xs={4}>Update Address</SubmitButton>
              </React.Fragment>
            )}
          </Form>
        </CardContent>
      </Card>
    </Grid>
  );
};

AddressSettings.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(AddressSettings);

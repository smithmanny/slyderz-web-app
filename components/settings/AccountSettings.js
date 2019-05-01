import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '../shared/Divider';

import Form, { TextField, SubmitButton } from '../form/Form';
import Text from '../shared/Text';
import updateAccountSettingsMutation from '../../lib/gql/mutation/settings/UpdateAccountSettingsMutation.gql';

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

const AccountSettings = ({ classes, user }) => {
  const { email, firstName, lastName } = user;
  return (
    <Grid item xs={8} className={classes.form}>
      <Card className={classes.card}>
        <CardContent>
          <Form
            defaultValues={{ email, firstName, lastName }}
            mutate={{
              mutation: updateAccountSettingsMutation,
              variables: values => ({
                ...values
              })
            }}
          >
            {({ values, handleChange }) => (
              <React.Fragment>
                <Grid item xs={12}>
                  <Text type="h4" className={classes.settingSection}>
                    Personal Information
                  </Text>
                  <Divider />
                </Grid>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={values.email}
                  InputProps={{
                    endAdornment: <EmailIcon />
                  }}
                />
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  autoComplete="name"
                  onChange={handleChange}
                  value={values.firstName}
                  InputProps={{
                    endAdornment: <PersonIcon />
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  InputProps={{
                    endAdornment: <PersonIcon />
                  }}
                />
                <SubmitButton xs={4}>Update Account</SubmitButton>
              </React.Fragment>
            )}
          </Form>
        </CardContent>
      </Card>

      {/* Password Form */}
      <Card>
        <CardContent>
          <Form
            mutate={{
              mutation: updateAccountSettingsMutation,
              variables: values => ({
                ...values
              })
            }}
          >
            {({ values, handleChange }) => (
              <React.Fragment>
                <Grid item xs={12}>
                  <Text type="h4" className={classes.settingSection}>
                    Change Password
                  </Text>
                  <Divider />
                </Grid>
                <TextField
                  variant="outlined"
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  onChange={handleChange}
                  value={values.currentPassword}
                  InputProps={{
                    endAdornment: <LockIcon />
                  }}
                />
                <TextField
                  variant="outlined"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  autoComplete="password"
                  onChange={handleChange}
                  value={values.newPassword}
                />
                <TextField
                  variant="outlined"
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  autoComplete="password"
                  onChange={handleChange}
                  value={values.confirmNewPassword}
                />
                <SubmitButton xs={4}>Update Password</SubmitButton>
              </React.Fragment>
            )}
          </Form>
        </CardContent>
      </Card>
    </Grid>
  );
};

AccountSettings.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(AccountSettings);

import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LockIcon from '@material-ui/icons/Lock';

import Form, { TextField } from '../form/Form';
import Text from '../shared/Text';
import resetPasswordMutation from '../../lib/gql/mutation/auth/resetPasswordMutation.gql';

const useStyles = theme => ({
  container: {
    maxWidth: '900px',
    margin: 'auto'
  },
  hDivider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(2, 0)
  },
  noAccountLink: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
});

const ResetPasswordForm = ({ classes, resetToken }) => (
  <div className={classes.container}>
    <Text type="h4">Reset Your Password</Text>
    <Divider className={classes.hDivider} />
    <Form
      mutate={{
        mutation: resetPasswordMutation,
        variables: values => ({
          ...values
        }),
        onCompleted: () => {
          Router.replace('/');
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <React.Fragment>
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
            InputProps={{
              endAdornment: <LockIcon />
            }}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.confirmPassword}
            InputProps={{
              endAdornment: <LockIcon />
            }}
          />

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              fullWidth
            >
              Reset Password
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </Form>
  </div>
);

ResetPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  resetToken: PropTypes.string
};

export default withStyles(useStyles)(ResetPasswordForm);

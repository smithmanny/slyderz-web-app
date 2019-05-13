import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';

import Form, { TextField } from '../form/Form';
import signInUserMutation from '../../lib/gql/mutation/auth/signInUserMutation.gql';

const useStyles = theme => ({
  textField: {
    width: '100%'
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

const SignInForm = ({
  classes,
  handleClose,
  openSignUpModal,
  openForgotPasswordModal
}) => (
  <div>
    <Typography variant="h6">Sign in to your Slyderz account</Typography>
    <Divider className={classes.hDivider} />
    <Form
      mutate={{
        mutation: signInUserMutation,
        variables: values => ({
          ...values
        }),
        onCompleted: () => {
          handleClose();
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <React.Fragment>
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

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              fullWidth
            >
              Sign In
            </Button>
          </Grid>
          <Divider className={classes.hDivider} />

          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              onClick={openForgotPasswordModal}
              className={classes.noAccountLink}
            >
              Forgot password?
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              align="right"
              color="primary"
              onClick={openSignUpModal}
              className={classes.noAccountLink}
            >
              Don't have an account?
            </Typography>
          </Grid>
        </React.Fragment>
      )}
    </Form>
  </div>
);

SignInForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openForgotPasswordModal: PropTypes.func.isRequired,
  openSignUpModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(useStyles)(SignInForm);

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';

import Form, { TextField } from '../form/Form';
import signUpUserMutation from '../../lib/gql/mutation/auth/signUpUserMutation.gql';

const useStyles = theme => ({
  haveAccountLink: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  hDivider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(2, 0)
  }
});

const SignUpForm = ({ classes, handleClose, openSignInModal }) => (
  <div>
    <Typography variant="h6">Sign up for a Slyderz account</Typography>
    <Divider className={classes.hDivider} />
    <Form
      mutate={{
        mutation: signUpUserMutation,
        variables: values => ({
          ...values
        }),
        onCompleted: () => {
          handleClose();
        }
      }}
    >
      {({ values, errors, handleChange, isSubmitting }) => (
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

          {/* <Grid item xs={12}>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="caption">
              To sign up, you must be 18 or older. This is kept personal.
            </Typography>
          </Grid>
          <Grid item xs={12} /> */}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Sign Up
            </Button>
          </Grid>
          <Divider className={classes.hDivider} />

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="primary"
              align="center"
              onClick={openSignInModal}
              className={classes.haveAccountLink}
            >
              Already have a Slyderz account? Login
            </Typography>
          </Grid>
        </React.Fragment>
      )}
    </Form>
  </div>
);

SignUpForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired,
  openSignInModal: PropTypes.func.isRequired
};

export default withStyles(useStyles)(SignUpForm);

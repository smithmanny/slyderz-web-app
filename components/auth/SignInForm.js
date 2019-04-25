import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Form, { TextField } from '../form/Form';
import signInUserMutation from '../../lib/gql/mutation/auth/signInUserMutation.gql';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const useStyles = theme => ({
  textField: {
    width: '100%'
  },
  hDivider: {
    height: 1,
    width: '100%',
    margin: `${theme.spacing.unit * 2}px 0`
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
}) => {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Typography variant="h6">Sign in to your Slyderz account</Typography>
      <Divider className={classes.hDivider} />
      <Mutation
        mutation={signInUserMutation}
        refetchQueries={[{ query: currentUserQuery }]}
        onCompleted={() => {
          handleClose();
        }}
        onError={error => {
          setErrorMessage(error);
          setOpen(true);
        }}
      >
        {signInUser => (
          <Form
            onSubmit={(values, { setSubmitting }) => {
              signInUser({
                variables: {
                  ...values
                }
              });
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <React.Fragment>
                <TextField
                  id="outlined-email-input"
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
                  id="outlined-password-input"
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
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleSnackbar}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  message={<span id="message-id">{errorMessage}(</span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={handleSnackbar}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
              </React.Fragment>
            )}
          </Form>
        )}
      </Mutation>
    </div>
  );
};

SignInForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openForgotPasswordModal: PropTypes.func.isRequired,
  openSignUpModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(useStyles)(SignInForm);

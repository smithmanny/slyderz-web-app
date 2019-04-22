import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Form from '../form/Form';
import signUpUserMutation from '../../lib/gql/mutation/auth/signUpUserMutation.gql';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const useStyles = theme => ({
  textField: {
    width: '100%'
  },
  haveAccountLink: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  hDivider: {
    height: 1,
    width: '100%',
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

const SignUpForm = ({ classes, handleClose, openSignInModal }) => {
  const [open, setOpen] = React.useState(false);

  function handleSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Typography variant="h6">Sign up for a Slyderz account</Typography>
      <Divider className={classes.hDivider} />
      <Mutation
        mutation={signUpUserMutation}
        refetchQueries={[{ query: currentUserQuery }]}
        onCompleted={user => {
          handleClose();
        }}
        onError={error => {
          setOpen(true);
        }}
      >
        {signup => (
          <Form
            onSubmit={async (values, { setSubmitting }) => {
              await signup({
                variables: {
                  ...values
                }
              });
              setSubmitting(false);
            }}
          >
            {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
              <React.Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-email-input"
                      variant="outlined"
                      label="Email"
                      className={classes.textField}
                      type="email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={values.email}
                      InputProps={{
                        endAdornment: <EmailIcon />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-first-name-input"
                      variant="outlined"
                      label="First Name"
                      className={classes.textField}
                      name="firstName"
                      autoComplete="name"
                      onChange={handleChange}
                      value={values.firstName}
                      InputProps={{
                        endAdornment: <PersonIcon />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-last-name-input"
                      variant="outlined"
                      label="Last Name"
                      className={classes.textField}
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      InputProps={{
                        endAdornment: <PersonIcon />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-password-input"
                      variant="outlined"
                      label="Password"
                      type="password"
                      className={classes.textField}
                      name="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={values.password}
                      InputProps={{
                        endAdornment: <LockIcon />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Birthday</Typography>
                    <Typography variant="caption">
                      To sign up, you must be 18 or older. This is kept
                      personal.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* //</Grid>{//</Grid></Grid></Grid>Grid item} */}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
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
                  message={
                    <span id="message-id">{JSON.stringify(errors)}</span>
                  }
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

SignUpForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired,
  openSignInModal: PropTypes.func.isRequired
};

export default withStyles(useStyles)(SignUpForm);

import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Form from '../form/Form';
import signUpUserMutation from '../../lib/gql/mutation/auth/signUpUserMutation.gql';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const useStyles = theme => ({
  divider: {
    width: 1,
    height: 28,
    margin: 4
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
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  grow: {
    flexGrow: 1
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

const SignUpForm = ({ classes, handleClose, openSignInModal }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

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
                  name: values.name,
                  email: values.email,
                  password: values.password
                }
              });
              setSubmitting(false);
            }}
          >
            {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
              <React.Fragment>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="Email"
                      >
                        <EmailIcon />
                      </IconButton>
                      <Divider className={classes.divider} />

                      <InputBase
                        className={classes.input}
                        placeholder="Email"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        required
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="Name"
                      >
                        <PersonIcon />
                      </IconButton>
                      <Divider className={classes.divider} />

                      <InputBase
                        className={classes.input}
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Paper>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton className={classes.iconButton} aria-label="Last Name">
                        <PersonIcon />
                      </IconButton>
                      <Divider className={classes.divider} />

                      <InputBase
                        className={classes.input}
                        placeholder="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Paper>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="Password"
                      >
                        <LockIcon />
                      </IconButton>
                      <Divider className={classes.divider} />

                      <InputBase
                        className={classes.input}
                        placeholder="Create a Password"
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        required
                      />
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Birthday</Typography>
                    <Typography variant="caption">
                      To sign up, you must be 18 or older. Other people won’t
                      see your birthday.
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

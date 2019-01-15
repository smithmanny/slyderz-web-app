import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

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

const useStyles = theme => ({
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  hDivider: {
    height: 1,
    width: '100%',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    padding: '40px 24px',
    maxWidth: 1032,
    margin: 'auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const createUserMutation = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      input: {
        data: { username: $username, email: $email, firstName: $firstName, lastName: $lastName, password: $password }
      }
    ) {
      user {
        username
        email
        firstName
        lastName
        password
      }
    }
  }
`;

const SignUpForm = ({ classes, handleClose }) => {
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
      <Divider className={classes.hDivider} />
      <Mutation
        mutation={createUserMutation}
        onCompleted={user => {
          handleClose();
        }}
        onError={error => {
          setOpen(true);
        }}
      >
        {(createUser, { error }) => (
          <Formik
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              createUser({
                variables: {
                  username: `${values.firstName}${values.lastName}`,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                },
              });
              setSubmitting(false);
            }}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton className={classes.iconButton} aria-label="Email">
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
                      <IconButton className={classes.iconButton} aria-label="First Name">
                        <PersonIcon />
                      </IconButton>
                      <Divider className={classes.divider} />

                      <InputBase
                        className={classes.input}
                        placeholder="First Name"
                        name="firstName"
                        value={values.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
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
                  </Grid>

                  <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                      <IconButton className={classes.iconButton} aria-label="Password">
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
                      <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Birthday</Typography>
                    <Typography variant="caption">
                      To sign up, you must be 18 or older. Other people won’t see your birthday.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* //</Grid>{//</Grid></Grid></Grid>Grid item} */}
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting} fullWidth>
                      Sign Up
                    </Button>
                  </Grid>
                  <Divider className={classes.hDivider} />

                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Already have a Slyderz account?</Typography>
                    <Typography variant="subtitle1">Login</Typography>
                  </Grid>
                </Grid>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleSnackbar}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">Error! :(</span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={handleSnackbar}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </div>
  );
};

SignUpForm.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(SignUpForm);

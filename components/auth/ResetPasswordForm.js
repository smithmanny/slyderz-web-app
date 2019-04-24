import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Form from '../form/Form';
import Text from '../shared/Text';
import resetPasswordMutation from '../../lib/gql/mutation/auth/resetPasswordMutation.gql';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';

const useStyles = theme => ({
  container: {
    maxWidth: '900px',
    margin: 'auto'
  },
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

const ResetPasswordForm = ({ classes, resetToken }) => {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div className={classes.container}>
      <Text type="display1">Reset Your Password</Text>
      <Divider className={classes.hDivider} />
      <Mutation
        mutation={resetPasswordMutation}
        refetchQueries={[{ query: currentUserQuery }]}
        onCompleted={() => Router.push({ pathname: '/' })}
        onError={error => {
          setErrorMessage(error);
          setOpen(true);
        }}
      >
        {resetPassword => (
          <Form
            onSubmit={(values, { setSubmitting }) => {
              resetPassword({
                variables: {
                  ...values,
                  resetToken
                }
              });
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <React.Fragment>
                <Grid container spacing={24}>
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
                    <TextField
                      id="outlined-confirm-password-input"
                      variant="outlined"
                      label="Confirm Password"
                      type="password"
                      className={classes.textField}
                      name="confirmPassword"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      InputProps={{
                        endAdornment: <LockIcon />
                      }}
                    />
                  </Grid>

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

ResetPasswordForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  resetToken: PropTypes.string
};

export default withStyles(useStyles)(ResetPasswordForm);

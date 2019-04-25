import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Form, { TextField } from '../form/Form';
import forgotPasswordMutation from '../../lib/gql/mutation/auth/forgotPasswordMutation.gql';

const useStyles = theme => ({
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

const ForgotPasswordForm = ({ classes, handleClose, openSignInModal }) => {
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
      <Typography variant="h6">Forgot Your Password?</Typography>
      <Divider className={classes.hDivider} />
      <Mutation
        mutation={forgotPasswordMutation}
        onCompleted={() => {
          handleClose();
        }}
        onError={error => {
          setErrorMessage(error);
          setOpen(true);
        }}
      >
        {requestReset => (
          <Form
            onSubmit={(values, { setSubmitting }) => {
              requestReset({
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
                <Divider className={classes.hDivider} />

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    className={classes.noAccountLink}
                    onClick={openSignInModal}
                  >
                    Go Back
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

ForgotPasswordForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openSignInModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(useStyles)(ForgotPasswordForm);

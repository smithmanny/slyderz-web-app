import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/styles';
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
    margin: theme.spacing(2, 0)
  },
  noAccountLink: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
});

const ForgotPasswordForm = ({ classes, handleClose, openSignInModal }) => (
  <div>
    <Typography variant="h6">Forgot Your Password?</Typography>
    <Divider className={classes.hDivider} />
    <Form
      mutate={{
        mutation: forgotPasswordMutation,
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
        </React.Fragment>
      )}
    </Form>
  </div>
);

ForgotPasswordForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openSignInModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(useStyles)(ForgotPasswordForm);

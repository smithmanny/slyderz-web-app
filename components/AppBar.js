import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Route from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import { default as MuiAppBar } from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import SignInForm from './auth/SignInForm';
import SignUpForm from './auth/SignUpForm';
import BasicModal from './BasicModal';

const styles = theme => ({
  main: {
    maxWidth: 1920,
    margin: 'auto',
  },
  menuItem: {
    marginLeft: theme.spacing.unit * 3,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const AppBar = ({ auth, classes }) => {
  const [user, setUser] = useState(false);
  const [values, setValues] = useState({
    openAuthModal: false,
    modalView: 'log_in',
  });

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => Route.push('/')}>
            Slyderz
          </Typography>

          {!user && (
            <React.Fragment>
              {/* <Button
                variant="contained"
                color="secondary"
                className={classes.menuItem}
                onClick={() => setValues({ ...values, openAuthModal: true, modalView: 'sign_up' })}
              >
                Sign Up
              </Button> */}

              <Button
                variant="contained"
                color="secondary"
                className={classes.menuItem}
                onClick={() => auth.login()}
              >
                Log In
              </Button>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <IconButton color="inherit">
                <ShoppingCart />
              </IconButton>

              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </React.Fragment>
          )}

          <BasicModal open={values.openAuthModal} onClose={() => setValues({ ...values, openAuthModal: false })}>
            {values.modalView === 'log_in' ? (
              <SignInForm
                handleClose={() => setValues({ ...values, openAuthModal: false })}
                openSignUpModal={() => setValues({ ...values, modalView: 'sign_up' })}
              />
            ) : (
              <SignUpForm
                handleClose={() => setValues({ ...values, openAuthModal: false })}
                openSignInModal={() => setValues({ ...values, modalView: 'log_in' })}
              />
            )}
          </BasicModal>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default withStyles(styles)(AppBar);
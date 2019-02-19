import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Route from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import SignInForm from './form/SignInForm';
import SignUpForm from './form/SignUpForm';
import BasicModal from './BasicModal';

const useStyles = theme => ({
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

const Layout = ({ children, classes }) => {
  const [user, setUser] = useState(false);
  const [values, setValues] = useState({
    openAuthModal: false,
    modalView: 'log_in',
  });

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => Route.push('/')}>
              Slyderz
            </Typography>

            {!user && (
              <React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.menuItem}
                  onClick={() => setValues({ ...values, openAuthModal: true, modalView: 'sign_up' })}
                >
                  Sign Up
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.menuItem}
                  onClick={() => setValues({ ...values, openAuthModal: true, modalView: 'log_in' })}
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
        </AppBar>
      </div>
      <main className={classes.main}>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Layout);

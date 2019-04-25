import React from 'react';
import PropTypes from 'prop-types';
import Route from 'next/router';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-named-default
import { default as MuiAppBar } from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import ForgotPasswordForm from '../auth/ForgotPasswordForm';
import BasicModal from '../BasicModal';
import currentUserQuery from '../../lib/gql/query/user/currentUserQuery.gql';
import signOutMutation from '../../lib/gql/mutation/auth/signOutUserMutation.gql';

const styles = theme => ({
  main: {
    maxWidth: 1920,
    margin: 'auto'
  },
  menuItem: {
    marginLeft: theme.spacing.unit * 3
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const AppBar = ({ classes, user }) => {
  const [values, setValues] = React.useState({
    openAuthModal: false,
    modalView: 'log_in'
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const SignoutMenuItem = props => (
    <Mutation
      mutation={signOutMutation}
      refetchQueries={[{ query: currentUserQuery }]}
    >
      {signout => (
        <MenuItem
          onClick={() => {
            signout();
            handleMenuClose();
          }}
        >
          Sign out
        </MenuItem>
      )}
    </Mutation>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => Route.push('/settings')}>Profile</MenuItem>
      <MenuItem onClick={() => Route.push('/settings')}>My account</MenuItem>
      <SignoutMenuItem />
    </Menu>
  );

  function renderModal() {
    switch (values.modalView) {
      case 'log_in':
        return (
          <SignInForm
            handleClose={() => setValues({ ...values, openAuthModal: false })}
            openSignUpModal={() =>
              setValues({ ...values, modalView: 'sign_up' })
            }
            openForgotPasswordModal={() =>
              setValues({ ...values, modalView: 'forgot_password' })
            }
          />
        );
      case 'sign_up':
        return (
          <SignUpForm
            handleClose={() => setValues({ ...values, openAuthModal: false })}
            openSignInModal={() =>
              setValues({ ...values, modalView: 'log_in' })
            }
          />
        );
      case 'forgot_password':
        return (
          <ForgotPasswordForm
            handleClose={() => setValues({ ...values, openAuthModal: false })}
            openSignInModal={() =>
              setValues({ ...values, modalView: 'log_in' })
            }
          />
        );
      default:
        return (
          <SignUpForm
            handleClose={() => setValues({ ...values, openAuthModal: false })}
            openSignInModal={() =>
              setValues({ ...values, modalView: 'log_in' })
            }
          />
        );
    }
  }

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            onClick={() => Route.push('/')}
          >
            Slyderz
          </Typography>

          {!user && (
            <React.Fragment>
              <Button
                className={classes.menuItem}
                onClick={() =>
                  setValues({
                    ...values,
                    openAuthModal: true,
                    modalView: 'sign_up'
                  })
                }
              >
                Sign up
              </Button>
              <Button
                className={classes.menuItem}
                onClick={() =>
                  setValues({
                    ...values,
                    openAuthModal: true,
                    modalView: 'log_in'
                  })
                }
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

              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </React.Fragment>
          )}
          {/* Profile Menu */}
          {renderMenu}
          <BasicModal
            open={values.openAuthModal}
            onClose={() => setValues({ ...values, openAuthModal: false })}
          >
            {renderModal()}
          </BasicModal>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

AppBar.propTypes = {
  classes: PropTypes.shape(),
  user: PropTypes.shape()
};

export default withStyles(styles)(AppBar);

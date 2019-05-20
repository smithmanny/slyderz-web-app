import React from 'react';
import PropTypes from 'prop-types';
import Route from 'next/router';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/styles';
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
import User from './User';

const styles = theme => ({
  slyderButton: {
    marginRight: theme.spacing(3),
    color: 'white',
    borderColor: 'white'
  },
  menuItem: {
    marginLeft: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },
  grow: {
    marginRight: 'auto',
    textTransform: 'uppercase',
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const AppBar = ({ classes }) => {
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

  const renderMenu = user => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => Route.push('/settings')}>My Account</MenuItem>
      {/* {user && user.chef && user.chef.isChef === 'CHEF' && (
        <MenuItem onClick={() => Route.push('/apply')}>Manage Profile</MenuItem>
      )} */}
      {user && user.permissions.includes('ADMIN') && (
        <MenuItem onClick={() => Route.push('/admin/chefs')}>Chefs</MenuItem>
      )}
      {user && user.chef && user.chef.isChef === ('PENDING' || 'NO') && (
        <MenuItem onClick={() => Route.push('/apply')}>
          Become a Slyder
        </MenuItem>
      )}
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
    <User>
      {({ data }) => (
        <div className={classes.root}>
          <MuiAppBar position="static">
            <Toolbar>
              <Typography
                variant="h4"
                color="inherit"
                className={classes.grow}
                onClick={() => Route.push('/')}
              >
                Slyderz
              </Typography>

              {!data && (
                <React.Fragment>
                  <Button
                    className={classes.slyderButton}
                    variant="outlined"
                    onClick={() => Route.push('/apply')}
                  >
                    Become a Chef
                  </Button>
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

              {data && data.me && (
                <React.Fragment>
                  {/* <IconButton color="inherit">
                    <ShoppingCart />
                  </IconButton> */}

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
              {renderMenu(data && data.me)}
              <BasicModal
                open={values.openAuthModal}
                onClose={() => setValues({ ...values, openAuthModal: false })}
              >
                {renderModal()}
              </BasicModal>
            </Toolbar>
          </MuiAppBar>
        </div>
      )}
    </User>
  );
};

AppBar.propTypes = {
  classes: PropTypes.shape()
};

export default withStyles(styles)(AppBar);

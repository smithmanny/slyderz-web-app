import React from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import BasicModal from '../BasicModal';

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

const AppBar = ({ classes, user }) => {
  const [values, setValues] = React.useState({
    openAuthModal: false,
    modalView: 'log_in',
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} onClick={() => Route.push('/')}>
            Slyderz
          </Typography>

          {!user && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.menuItem}
              onClick={() => setValues({ ...values, openAuthModal: true, modalView: 'sign_up' })}
            >
              Log In
            </Button> 
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

/* eslint-disable import/no-named-default */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, Fab } from './index';
import IconButton from './IconButton';
import Grid from './Grid';
import Typography from './Typography';
import { ShoppingCart, PersonIcon } from '../../assets/icons';
import CheckoutCartModal from '../checkout/CheckoutCartModal';
import AccountPopover from '../shared/AccountPopover';

import appbarStyles from '../../assets/styles/consumer/appbarSyles';
import CheckoutCartContext from '../../context/checkoutCartContext';
import { getUser } from '../../context/userContext';

const AppBarComponent = ({ ...props }) => {
  const classes = appbarStyles();
  const [showCartModal, setShowCartModal] = useContext(CheckoutCartContext);
  const [showCartLogo, setCartLogo] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = getUser();

  const closeAccountModal = () => {
    setAnchorEl(null);
  };

  const handleAccountModalClick = event => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const isWindow = typeof window !== 'undefined';
    // Hide cart logo on checkout screen
    if (isWindow) {
      if (window.location.pathname === '/checkout') {
        setShowCartModal(false);
        setCartLogo(false);
      }
    }
  }, [user]);

  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : null;

  return (
    <AppBar
      className={classes.root}
      position="static"
      color="default"
      {...props}
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <a className={classes.logo}>
            <Typography variant="h5">Slyderz</Typography>
          </a>
        </Link>

        <Grid container className={classes.linksSection} spacing={1}>
          {!user && (
            <Grid item>
              <Link href="/auth/login">
                <a className={classes.login}>
                  <Typography variant="h6">Log In</Typography>
                </a>
              </Link>
            </Grid>
          )}
          {user && (
            <Grid item>
              <Fab
                aria-label="account-fab"
                variant="extended"
                className={classes.accountFab}
                onClick={handleAccountModalClick}
              >
                <PersonIcon fontSize="large" />
                <Typography className={classes.profileName} variant="body1">
                  Shakhor
                </Typography>
              </Fab>
            </Grid>
          )}
          {showCartLogo && user && (
            <Grid item>
              <IconButton
                aria-label="cart"
                disableRipple
                onClick={() => setShowCartModal(!showCartModal)}
              >
                <Badge
                  className={classes.margin}
                  badgeContent={4}
                  color="primary"
                >
                  <ShoppingCart
                    className={classes.iconButton}
                    fontSize="large"
                  />
                </Badge>
              </IconButton>
            </Grid>
          )}
        </Grid>
        {showCartModal && (
          <CheckoutCartModal
            classes={classes}
            closeCartModal={() => setShowCartModal(false)}
          />
        )}
        <AccountPopover
          id={id}
          open={open}
          onClose={closeAccountModal}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  linkProps: PropTypes.object
};

export default AppBarComponent;

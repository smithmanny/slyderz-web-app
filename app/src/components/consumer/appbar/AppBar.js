/* eslint-disable import/no-named-default */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, Fab, IconButton } from '../../shared';
import Grid from '../../shared/Grid';
import Typography from '../../shared/Typography';
import { ShoppingCart, PersonIcon } from '../../../assets/icons';
import CheckoutCartModal from '../checkout/CheckoutCartModal';
import AccountPopover from '../accountPopover';

import appbarStyles from './styles';
import CheckoutCartContext from '../../../context/checkoutCartContext';
import { withCurrentUser } from '../../../context/currentSessionContext';

const AppBarComponent = ({ currentUser, ...props }) => {
  const classes = appbarStyles();
  const [showCartModal, setShowCartModal] = useContext(CheckoutCartContext);
  const [showCartLogo, setCartLogo] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : null;

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
  }, [currentUser]);
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
          {!currentUser && (
            <Grid item>
              <Link href="/auth/login">
                <a className={classes.login}>
                  <Typography variant="h6">Log In</Typography>
                </a>
              </Link>
            </Grid>
          )}
          {currentUser && (
            <Grid item>
              <Fab
                aria-label="account-fab"
                variant="extended"
                className={classes.accountFab}
                onClick={handleAccountModalClick}
              >
                <PersonIcon fontSize="large" />
                <Typography className={classes.profileName} variant="body1">
                  {currentUser.firstName}
                </Typography>
              </Fab>
            </Grid>
          )}
          {showCartLogo && currentUser && (
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
        {currentUser && (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  linkProps: PropTypes.object
};

export default withCurrentUser(AppBarComponent);

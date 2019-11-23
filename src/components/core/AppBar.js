/* eslint-disable import/no-named-default */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, IconButton, Grid, Link, Typography } from './index';
import { ShoppingCart, PersonIcon } from '../../assets/icons';
import CheckoutCartModal from '../checkout/CheckoutCartModal';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';

import CheckoutCartContext from '../../context/checkoutCartContext';

const AppBarComponent = ({ ...props }) => {
  const classes = appbarStyles();
  const [showCartModal, { closeCartModal, handleCartModal }] = useContext(
    CheckoutCartContext
  );
  const [showCartLogo, setCartLogo] = useState(true);

  useEffect(() => {
    const isWindow = typeof window !== 'undefined';
    // Hide cart logo on checkout screen
    if (isWindow) {
      if (window.location.pathname === '/checkout') {
        closeCartModal();
        setCartLogo(false);
      }
    }
  });

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

        <div className={classes.linksSection}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h6">Log In</Typography>
            </Grid>
            <Grid item>
              <span className={classes.profile}>
                <PersonIcon fontSize="large" />{' '}
                <Typography className={classes.name} variant="body1">
                  Shakhor
                </Typography>
              </span>
            </Grid>
            {showCartLogo && (
              <Grid item>
                <IconButton
                  aria-label="cart"
                  disableRipple
                  onClick={handleCartModal}
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
              handleCartModal={handleCartModal}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  linkProps: PropTypes.object
};

export default AppBarComponent;

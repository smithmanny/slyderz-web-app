/* eslint-disable import/no-named-default */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, Link } from './index';
import IconButton from './IconButton';
import Grid from './Grid';
import Typography from './Typography';
import { ShoppingCart, PersonIcon } from '../../assets/icons';
import CheckoutCartModal from '../checkout/CheckoutCartModal';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';

import CheckoutCartContext from '../../context/checkoutCartContext';

const AppBarComponent = ({ ...props }) => {
  const classes = appbarStyles();
  const [showCartModal, setShowCartModal] = useContext(CheckoutCartContext);
  const [showCartLogo, setCartLogo] = useState(true);

  useEffect(() => {
    const isWindow = typeof window !== 'undefined';
    // Hide cart logo on checkout screen
    if (isWindow) {
      if (window.location.pathname === '/checkout') {
        setShowCartModal(false);
        setCartLogo(false);
      }
    }
  }, []);

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
          <Grid item>
            <Link href="/auth/login">
              <a className={classes.login}>
                <Typography variant="h6">Log In</Typography>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <span className={classes.profile}>
              <PersonIcon fontSize="large" />
              <Typography className={classes.profileName} variant="body1">
                <Link href="/settings">
                  <a>Shakhor</a>
                </Link>
              </Typography>
            </span>
          </Grid>
          {showCartLogo && (
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
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  linkProps: PropTypes.object
};

export default AppBarComponent;

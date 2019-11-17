/* eslint-disable import/no-named-default */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, IconButton, Grid, Link, Typography, withStyles } from './index';
import { ShoppingCart, PersonIcon } from '../icons';
import CheckoutCartModal from '../checkoutModal';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';
import CheckoutCartContext from '../../context/checkoutCartContext';

const AppBarComponent = ({ classes, ...props }) => {
  const [showCart, handleCart] = useContext(CheckoutCartContext);

  return (
    <AppBar
      className={classes.root}
      position="static"
      color="default"
      {...props}
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/" prefetch>
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
            <Grid item>
              <IconButton
                aria-label="cart"
                disableRipple
                onClick={() => handleCart(true)}
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
          </Grid>
          {showCart && (
            <CheckoutCartModal classes={classes} handleCart={handleCart} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  linkProps: PropTypes.object
};

export default withStyles(appbarStyles)(AppBarComponent);

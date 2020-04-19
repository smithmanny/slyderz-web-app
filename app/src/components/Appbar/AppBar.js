/* eslint-disable import/no-named-default */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Badge, Button, Fab, IconButton } from '../shared';
import Grid from '../shared/Grid';
import Typography from '../shared/Typography';
import { ShoppingCart, PersonIcon } from '../../assets/icons';
import AccountPopover from '../AccountPopover';
import CartPopover from '../CartPopover';

import appbarStyles from './styles';
import withCurrentUser from '../../utils/withCurrentUser';

const AppBarComponent = ({ currentUser, ...props }) => {
  const classes = appbarStyles();
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountOpen = Boolean(accountAnchorEl);
  const isCartOpen = Boolean(cartAnchorEl);
  const accountId = isAccountOpen ? 'account-popover' : null;
  const cartId = isCartOpen ? 'cart-popover' : null;

  const closeAccountModal = () => {
    setAccountAnchorEl(null);
  };

  const closeCartModal = () => {
    setCartAnchorEl(null);
  };

  const handleAccountModalClick = event => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleCartModalClick = event => {
    setCartAnchorEl(event.currentTarget);
  };

  const renderLoggedOutLinks = () => (
    <React.Fragment>
      <Grid item>
        <Button color="primary">
          Become a chef
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary">
          Sign up
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.login}
          variant="outlined"
          color="primary"
        >
          Log in
        </Button>
      </Grid>
    </React.Fragment>
  )

  const renderLoggedInLinks = () => (
    <React.Fragment>
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
      <Grid item>
        <IconButton
          aria-label="cart"
          disableRipple
          onClick={handleCartModalClick}
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
    </React.Fragment>
  )

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
          {!currentUser && renderLoggedOutLinks()}
          {currentUser && renderLoggedInLinks()}
        </Grid>

        <CartPopover
          id={cartId}
          open={isCartOpen}
          onClose={closeCartModal}
          anchorEl={cartAnchorEl}
        />
        {currentUser && (
          <AccountPopover
            id={accountId}
            open={isAccountOpen}
            onClose={closeAccountModal}
            anchorEl={accountAnchorEl}
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
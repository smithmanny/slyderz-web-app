/* eslint-disable import/no-named-default */
import React, { useState } from "react";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import { default as AppBarMui } from "@material-ui/core/AppBar";

import appbarStyles from "./styles";

import { ShoppingCart, PersonIcon } from "../../assets/icons";
import Button from "../shared/Button";
import { Badge, Fab, IconButton } from "../shared";
import Grid from "../shared/Grid";
import Typography from "../shared/Typography";
import AccountPopover from "../accountPopover";

const AppBar = (props) => {
  const classes = appbarStyles();
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountOpen = Boolean(accountAnchorEl);
  const accountId = isAccountOpen ? "account-popover" : null;
  const session = false;

  const closeAccountModal = () => {
    setAccountAnchorEl(null);
  };
  const handleAccountModalClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const renderLoggedOutLinks = () => (
    <>
      <Grid item>
        <Link href="/become-a-chef">
          <Button color="primary" component="a">
            Become a chef
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Button
          className={classes.login}
          variant="outlined"
          color="primary"
          component="a"
          href="/api/auth/signin"
        >
          Log in
        </Button>
      </Grid>
    </>
  );

  const renderLoggedInLinks = () => (
    <>
      <Grid item>
        <IconButton
          aria-label="cart"
          disableRipple
          // onClick={}
        >
          <Badge className={classes.margin} badgeContent={4} color="primary">
            <ShoppingCart className={classes.iconButton} fontSize="large" />
          </Badge>
        </IconButton>
      </Grid>
      <Grid item>
        <Fab
          aria-label="account-fab"
          variant="extended"
          className={classes.accountFab}
          onClick={handleAccountModalClick}
        >
          <PersonIcon fontSize="large" />
          <Typography className={classes.profileName} variant="body1">
            {session.user.name}
          </Typography>
        </Fab>
      </Grid>
    </>
  );

  return (
    <>
      <AppBarMui
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
            {session ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </Grid>

          {session && (
            <AccountPopover
              id={accountId}
              open={isAccountOpen}
              onClose={closeAccountModal}
              anchorEl={accountAnchorEl}
            />
          )}
        </Toolbar>
      </AppBarMui>
    </>
  );
};

export default AppBar;

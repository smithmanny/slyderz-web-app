import { useState } from 'react';
import { Link, Routes, useSession } from "blitz";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { default as MuiAppBar } from "@mui/material/AppBar";

import AccountPopover from "app/core/components/accountPopover"

import styles from './styles';

const Appbar = (props) => {
  const classes = styles();
  const session = useSession();
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountOpen = Boolean(accountAnchorEl);
  const accountId = isAccountOpen ? "account-popover" : null;

  const closeAccountModal = () => {
    setAccountAnchorEl(null);
  };
  const handleAccountModalClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const renderLoggedOutLinks = () => (
    <>
      <Grid item>
        <Link href={Routes.BecomeAChef()}>
          <Button component="a">
            Become a chef
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href={Routes.LoginPage()}>
          <Button
            className={classes.login}
            variant="contained"
            // color="primary"
            component="a"
          >
            Log in
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href={Routes.SignupPage()}>
          <Button
            className={classes.login}
            variant="outlined"
            // color="primary"
            component="a"
          >
            Sign up
          </Button>
        </Link>
      </Grid>
    </>
  );
  const renderLoggedInLinks = () => (
    <Grid item>
      <IconButton
        aria-label="cart"
        disableRipple
        onClick={handleAccountModalClick}
        size="large">
        <PersonIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
  return (
    <MuiAppBar
      position="static"
      color="primary"
      {...props}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid container item xs>
            <Link href="/">
              <a>
                <Typography variant="h5">Slyderz</Typography>
              </a>
            </Link>
          </Grid>

          <Grid container item xs={3} spacing={2} justifyContent="flex-end">
            {session.userId ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </Grid>
        </Grid>

        {session.userId && (
          <AccountPopover
            id={accountId}
            open={isAccountOpen}
            onClose={closeAccountModal}
            anchorEl={accountAnchorEl}
          />
        )}
      </Toolbar>
    </MuiAppBar>
  )
};

export default Appbar;

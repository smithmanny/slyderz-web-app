import Link from "next/link";
import { useSession } from "@blitzjs/auth";
import { Routes } from "@blitzjs/next";
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import Stack from '@mui/material/Stack';
import PersonIcon from "@mui/icons-material/Person";
import Toolbar from "@mui/material/Toolbar";
import { default as MuiAppBar } from "@mui/material/AppBar";

import AccountPopover from "app/core/components/accountPopover"
import Button from "app/core/components/shared/Button"
import Box from "app/core/components/shared/Box"
import Typography from "app/core/components/shared/Typography"

const Appbar = (props) => {
  const session = useSession({ suspense: false });
  console.log(session)
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
    <span>
      <Stack direction="row" spacing={2}>
        {/* <Link href={Routes.BecomeAChef()}>
          <Button component="a" variant="text">
            Become a chef
          </Button>
        </Link> */}
        <Link href={Routes.LoginPage()}>
          <Button
            variant="contained"
            component="a"
          >
            Log in
          </Button>
        </Link>
        <Link href={Routes.SignupPage()}>
          <Button
            variant="contained"
            component="a"
          >
            Sign up
          </Button>
        </Link>
      </Stack>
    </span>
  );
  const renderLoggedInLinks = () => (
    <span>
      <Stack direction="row" spacing={2}>
        <Button variant="text" color="white">Dashboard</Button>
        <IconButton
          aria-label="cart"
          disableRipple
          onClick={handleAccountModalClick}
          size="large">
          <PersonIcon fontSize="large" />
        </IconButton>

        <AccountPopover
            id={accountId}
            open={isAccountOpen}
            onClose={closeAccountModal}
            anchorEl={accountAnchorEl}
          />
      </Stack>
    </span>
  );
  return (
    <MuiAppBar
      position="static"
      sx={{ backgroundColor: 'transparent', mb: 4 }}
      {...props}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/">
            <a>
              <Typography variant="h5">Slyderz</Typography>
            </a>
          </Link>

          <div>
            {session.userId ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </div>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
};

export default Appbar;

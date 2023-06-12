import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useAppSelector } from "integrations/redux";
import { default as MuiAppBar } from "@mui/material/AppBar";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import { trpc } from "server/utils/trpc";

import Box from "app/core/components/shared/Box";
import Typography from "app/core/components/shared/Typography";
import { Container } from "@mui/material";
import Button from "../shared/Button";

const AccountPopover = dynamic(
  () => import("app/core/components/accountPopover"),
  {
    ssr: false,
  }
);

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Appbar = (props) => {
  const router = useRouter();
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = useState(true);
  const user = useAppSelector((state) => state.user);
  const isAccountOpen = Boolean(accountAnchorEl);
  const accountId = isAccountOpen ? "account-popover" : null;

  const handleVerifyEmailAlertOnClose = useCallback(() => {
    setShowVerifyEmailAlert(false);
  }, []);

  const sendVerifyEmail = trpc.auth.sendConfirmEmailLink.useMutation({
    onSuccess: handleVerifyEmailAlertOnClose,
  });

  const closeAccountModal = useCallback(() => {
    setAccountAnchorEl(null);
  }, []);

  const handleAccountModalClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const navigateToDashboard = useCallback(async () => {
    await router.push("/dashboard");
  }, [router]);

  const handleVerifyEmailAlert = async () => {
    await sendVerifyEmail.mutateAsync({ email: user.email.emailAddress });
  };

  return (
    <>
      <ElevationScroll>
        <MuiAppBar
          position="fixed"
          sx={{
            backgroundColor: "#FFF",
            mb: 4,
            boxShadow: "none",
          }}
          {...props}
        >
          {user.userId && !user.email.isVerified && (
            <Collapse in={showVerifyEmailAlert}>
              <Alert
                variant="filled"
                severity="warning"
                onClose={handleVerifyEmailAlertOnClose}
                sx={{ borderRadius: 0 }}
              >
                Please verify your email.{" "}
                <Box
                  component="span"
                  onClick={handleVerifyEmailAlert}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Click here to send verification email
                </Box>
              </Alert>
            </Collapse>
          )}
          <Container maxWidth="xl">
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Link href="/">
                  <Typography
                    variant="h5"
                    sx={{ color: "black", fontWeight: 600 }}
                  >
                    Slyderz
                  </Typography>
                </Link>

                <Stack direction="row" spacing={2} alignItems="center">
                  {user.chef.isChef && (
                    <Button
                      label="chef dashboard"
                      variant="text"
                      onClick={navigateToDashboard}
                    >
                      <Typography sx={{ color: "black", fontWeight: 600 }}>
                        Your Dashboard
                      </Typography>
                    </Button>
                  )}
                  <IconButton
                    aria-label="cart"
                    disableRipple
                    onClick={handleAccountModalClick}
                    size="large"
                  >
                    <PersonIcon fontSize="large" />
                  </IconButton>

                  <AccountPopover
                    id={accountId}
                    open={isAccountOpen}
                    onClose={closeAccountModal}
                    anchorEl={accountAnchorEl}
                    chef={user.chef}
                  />
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </MuiAppBar>
      </ElevationScroll>
      <Toolbar />
      <Toolbar />
    </>
  );
};

export default Appbar;

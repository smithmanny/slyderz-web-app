import React from "react";
import Router from "next/router";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { default as MuiAppBar } from "@mui/material/AppBar";

import { trpc } from "server/utils/trpc";

import Box from "app/core/components/shared/Box";
import Typography from "app/core/components/shared/Typography";
import { Container } from "@mui/material";
import TwitterIcon from "app/core/components/icons/Twitter";
import InstagramIcon from "app/core/components/icons/Instagram";
import FacebookIcon from "app/core/components/icons/Facebook";

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
  const sendVerifyEmail = trpc.auth.sendConfirmEmailLink.useMutation({});

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

                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    aria-label="cart"
                    disableRipple
                    LinkComponent="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/slyderzapp"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    aria-label="cart"
                    disableRipple
                    LinkComponent="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/slyderz_app/"
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    aria-label="cart"
                    disableRipple
                    LinkComponent="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/slyderz"
                  >
                    <FacebookIcon />
                  </IconButton>
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

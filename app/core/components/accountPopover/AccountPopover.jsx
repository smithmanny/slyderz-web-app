import { useRouter } from "next/router";
import { useSession } from "@blitzjs/auth";
import { useMutation } from "@blitzjs/rpc";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import logoutMutation from 'app/auth/mutations/logout';

import Popover from "app/core/components/shared/Popover";
import { useEffect } from "react";
import { Routes } from "@blitzjs/next";

let routes = [
  {
    id: 0,
    icon: AddIcon,
    name: "Account",
    route: Routes.Account(),
  },
];

const AccountPopover = (props) => {
  const [logout] = useMutation(logoutMutation);
  const router = useRouter();
  const session = useSession()

  useEffect(() => {
    const loggedOutRoutes = [
      {
        id: 0,
        icon: AddIcon,
        name: "Login",
        route: Routes.LoginPage(),
      },
      {
        id: 0,
        icon: AddIcon,
        name: "Register",
        route: Routes.SignupPage(),
      },
    ]

    if (!session.userId) {
      routes = loggedOutRoutes
    }
  }, [session])

  const handlePopoverClick = (route) => {
    router.push(route)
    props.onClose();
  }

  return (
    <Popover {...props}>
      <List
        sx={{
          width: 225
        }}
      >
        {routes.map((link) => (
          <ListItemButton key={link.id} onClick={() => handlePopoverClick(link.route)}>
            <ListItemAvatar>
              <PersonIcon fontSize="large" />
            </ListItemAvatar>
            <ListItemText
              primary={link.name}
              sx={{
                "& span": {
                fontWeight: "500"
                }
              }}
            />
          </ListItemButton>
        ))}
        {session.userId ? (
          <ListItem onClick={() => logout()}>
            <ListItemText
              primary="Sign out"
              sx={{
                "& span": {
                  fontWeight: "500"
                }
              }}
            />
          </ListItem>
        ) : null}
      </List>
    </Popover>
  );
};

AccountPopover.defaultProps = {
  anchorEl: null,
  id: null
};

AccountPopover.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.element,
};

export default AccountPopover;

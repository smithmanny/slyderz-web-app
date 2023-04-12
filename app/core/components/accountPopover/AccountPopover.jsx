import { useRouter } from "next/router";
import { useSession } from "@blitzjs/auth";
import { useMutation, useQuery } from "@blitzjs/rpc";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

import logoutMutation from 'app/auth/mutations/logout';
import isChefOnboardedQuery from 'app/chefs/queries/isChefOnboarded'
import Popover from "app/core/components/shared/Popover";
import { loggedInRoutes, loggedOutRoutes, onboardedRoutes } from "./routes";

const AccountPopover = (props) => {
  const [logout] = useMutation(logoutMutation);
  const [isChefOnboarded] = useQuery(isChefOnboardedQuery)
  const router = useRouter();
  const session = useSession()

  const fetchListItems = () => {
    const routes = {
      loggedIn: loggedInRoutes,
      loggedOut: loggedOutRoutes,
      chefOnboarded: onboardedRoutes,
    }

    if (session.userId && !isChefOnboarded) {
      return routes.loggedIn
    }

    if (session.userId && isChefOnboarded) {
      return routes.chefOnboarded
    }

    return routes.loggedOut
  }

  const handlePopoverClick = (route) => {
    router.push(route)
    props.onClose();
  }

  const routes = fetchListItems()
  return (
    <Popover {...props}>
      <List
        sx={{
          width: 225
        }}
      >
        {routes.map((link) => (
          <ListItemButton key={link.id} onClick={() => handlePopoverClick(link.route)}>
            {link.icon && (
              <ListItemAvatar>
                <PersonIcon fontSize="large" />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={link.name}
              sx={{
                "& span": {
                fontWeight: "549"
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
  anchorEl: PropTypes.object,
};

export default AccountPopover;

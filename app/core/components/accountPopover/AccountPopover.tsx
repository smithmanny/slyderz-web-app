import { useRouter } from "next/router";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

import Popover from "app/core/components/shared/Popover";
import { loggedInRoutes, loggedOutRoutes, onboardedRoutes } from "./routes";
import { ChefType } from "integrations/redux/reducers/userReduer";

interface AccountPopver {
  id: string | null;
  open: boolean;
  onClose: () => void;
  anchorEl: any;
  chef: ChefType;
}

const AccountPopover = (props: AccountPopver) => {
  const { chef, onClose, ...rest } = props;
  const router = useRouter();
  const session = { userId: "" };

  const fetchListItems = () => {
    const routes = {
      loggedIn: loggedInRoutes,
      loggedOut: loggedOutRoutes,
      chefOnboarded: onboardedRoutes,
    };

    if (session.userId && !chef.isChef) {
      return routes.loggedIn;
    }

    if (session.userId && chef.isChefProfileComplete) {
      return routes.chefOnboarded;
    }

    return routes.loggedOut;
  };

  const handlePopoverClick = async (route) => {
    await router.push(route);
    onClose();
  };

  const routes = fetchListItems();
  return (
    <Popover onClose={onClose} name="slyderz-account-popover" {...rest}>
      <List
        sx={{
          width: 225,
        }}
      >
        {routes.map((link) => (
          <ListItemButton
            key={link.id}
            onClick={() => handlePopoverClick(link.route)}
          >
            {link.icon && (
              <ListItemAvatar>
                <PersonIcon fontSize="large" />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={link.name}
              sx={{
                "& span": {
                  fontWeight: "549",
                },
              }}
            />
          </ListItemButton>
        ))}
        {session.userId ? (
          // TODO
          <ListItemButton onClick={() => {}}>
            <ListItemText
              primary="Sign out"
              sx={{
                "& span": {
                  fontWeight: "500",
                },
              }}
            />
          </ListItemButton>
        ) : null}
      </List>
    </Popover>
  );
};

AccountPopover.defaultProps = {
  anchorEl: null,
  id: null,
};

AccountPopover.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
};

export default AccountPopover;

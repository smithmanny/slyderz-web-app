import { useRouter } from "next/router";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

import Popover from "app/components/shared/Popover";
import {
  loggedInRoutes,
  loggedOutRoutes,
  chefLoggedInRoutes,
} from "../../lib/routes";

import { trpc } from "server/utils/trpc";
import { OnboardingState } from ".prisma/client";

type ChefType = {
  isChef: boolean;
  isChefProfileComplete: boolean;
  onboardingState: OnboardingState | undefined;
};
interface AccountPopver {
  id: string | null;
  open: boolean;
  onClose: () => void;
  anchorEl: any;
  user?: {
    userId: string;
    chef?: ChefType;
  } | null;
}

const AccountPopover = (props: AccountPopver) => {
  const { user, onClose, ...rest } = props;
  const router = useRouter();
  const utils = trpc.useUtils();
  const logout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.user.fetchUserData.invalidate();

      window.rudderanalytics.reset();
      return handlePopoverClick("/");
    },
  });

  const fetchListItems = () => {
    const routes = {
      loggedIn: loggedInRoutes,
      loggedOut: loggedOutRoutes,
      chefLoggedIn: chefLoggedInRoutes,
    };

    if (user?.userId && !user?.chef?.isChef) {
      return routes.loggedIn;
    }

    if (user?.userId && user?.chef?.isChef) {
      return routes.chefLoggedIn;
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
        {user?.userId ? (
          <ListItemButton onClick={async () => logout.mutateAsync()}>
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

import { useMutation, Link, useRouter } from "blitz"
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

const routes = [
  {
    id: 0,
    icon: AddIcon,
    name: "Account",
    route: "/account",
  },
];

const AccountPopover = (props) => {
  const [logout] = useMutation(logoutMutation);
  const router = useRouter();

  const handlePopoverClick = (route) => {
    router.push(route)
    props.onClose();
  }

  return (
    <Popover {...props}>
      <List>
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
        <ListItem button onClick={() => logout()}>
          <ListItemText
            primary="Sign out"
            sx={{
              "& span": {
                fontWeight: "500"
                }
            }}
          />
        </ListItem>
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

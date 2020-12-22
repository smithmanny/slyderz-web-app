import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

import Popover from "../shared/Popover";
import accountPopoverStyles from "./styles";

const routes = [
  {
    id: 0,
    icon: AddIcon,
    name: "Account",
    route: "/settings",
  },
];

const AccountPopover = ({ ...props }) => {
  const classes = accountPopoverStyles();
  return (
    <Popover {...props}>
      <List>
        {routes.map((link) => (
          <Link key={link.id} href="/settings">
            <ListItem button key={link}>
              <ListItemAvatar>
                <PersonIcon fontSize="large" />
              </ListItemAvatar>
              <ListItemText primary={link.name} className={classes.text} />
            </ListItem>
          </Link>
        ))}
        <ListItem button component="a" href="/api/logout">
          <ListItemText primary="Sign out" className={classes.text} />
        </ListItem>
      </List>
    </Popover>
  );
};

AccountPopover.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AccountPopover;

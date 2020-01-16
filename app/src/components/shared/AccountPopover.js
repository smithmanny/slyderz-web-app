import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import accountPopoverStyles from '../../assets/styles/consumer/accountPopoverStyles';
import SIGNOUT_MUTATION from '../../libs/gql/mutation/auth/signoutMutation.gql';

const routes = [
  {
    icon: AddIcon,
    name: 'Account',
    route: '/settings'
  }
];

function AccountPopover({ ...props }) {
  const classes = accountPopoverStyles();
  const [signout] = useMutation(
    SIGNOUT_MUTATION,
    {
      onCompleted: () => {
        props.onClose();
        Router.replace('/')
      }
    }
    );

  return (
    <Popover {...props} aria-labelledby="account-popover">
      <List>
        {routes.map(link => (
          <ListItem button key={link}>
            <ListItemAvatar>
              <PersonIcon fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={link.name} className={classes.text} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={e => {
            e.preventDefault();
            signout();
          }}
        >
          <ListItemText primary="Sign out" className={classes.text} />
        </ListItem>
      </List>
    </Popover>
  );
}

AccountPopover.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default AccountPopover;

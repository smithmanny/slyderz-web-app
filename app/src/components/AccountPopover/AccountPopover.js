import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import Popover from '../shared/Popover';
import accountPopoverStyles from './styles';
import SIGNOUT_MUTATION from '../../libs/gql/mutation/auth/signoutMutation.gql';

const routes = [
  {
    icon: AddIcon,
    name: 'Account',
    route: '/settings'
  }
];

const AccountPopover = ({ ...props }) => {
  const classes = accountPopoverStyles();
  const [signout] = useMutation(SIGNOUT_MUTATION);
  return (
    <Popover {...props}>
      <List>
        {routes.map(link => (
          <Link href='/settings'>
            <ListItem button key={link}>
              <ListItemAvatar>
                <PersonIcon fontSize="large" />
              </ListItemAvatar>
              <ListItemText primary={link.name} className={classes.text} />
            </ListItem>
          </Link>
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
};

export default AccountPopover;

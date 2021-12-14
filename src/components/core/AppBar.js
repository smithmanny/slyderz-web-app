/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import { Link, withStyles } from './index';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';

const AppBarComponent = ({ classes, linkProps, ...props }) => (
  <AppBar className={classes.root} position="static" color="default" {...props}>
    <Toolbar>
      <div className={classes.logo}>
        <div>
          <Link href="/" prefetch>
            <a {...linkProps}>
              <Typography variant="h6">Slyderz</Typography>
            </a>
          </Link>
        </div>
      </div>
      <div className={classes.linksSection}>
        <ul>
          <li>
            <a {...linkProps}>
              <Typography variant="h6">Help</Typography>
            </a>
          </li>
          <li>
            <a {...linkProps}>
              <Typography variant="h6">Sign up</Typography>
            </a>
          </li>
          <li>
            <a {...linkProps}>
              <Typography variant="h6">Log in</Typography>
            </a>
          </li>
        </ul>
      </div>
    </Toolbar>
  </AppBar>
);

AppBarComponent.defaultProps = {
  linkProps: {}
};

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  linkProps: PropTypes.object
};

export default withStyles(appbarStyles)(AppBarComponent);

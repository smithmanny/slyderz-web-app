/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { default as MuiAppBar } from '@material-ui/core/AppBar';

import { withStyles } from './index';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';

const AppBar = ({ classes, ...props }) => (
  <MuiAppBar {...props} position="static" color="default">
    <Toolbar>
      <div className={classes.logo}>
        <Typography variant="h6" color="inherit">
          Slyderz
        </Typography>
      </div>
      <div className={classes.linksSection}>
        <ul>
          <li>
            <Typography variant="h6">Help</Typography>
          </li>
          <li>
            <Typography variant="h6">Sign up</Typography>
          </li>
          <li>
            <Typography variant="h6">Log in</Typography>
          </li>
        </ul>
      </div>
    </Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appbarStyles)(AppBar);

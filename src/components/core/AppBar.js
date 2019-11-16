/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import { Grid, Link, withStyles } from './index';
import appbarStyles from '../../assets/styles/consumer/appbarSyles';

const AppBarComponent = ({ classes, ...props }) => (
  <AppBar className={classes.root} position="static" color="default" {...props}>
    <Toolbar className={classes.toolbar}>
      <Link href="/" prefetch>
        <a className={classes.logo}>
          <Typography variant="h5">Slyderz</Typography>
        </a>
      </Link>

      <div className={classes.linksSection}>
        <Grid container>
          <Typography variant="h6">Slyderz</Typography>
        </Grid>
      </div>
    </Toolbar>
  </AppBar>
);

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  linkProps: PropTypes.object
};

export default withStyles(appbarStyles)(AppBarComponent);

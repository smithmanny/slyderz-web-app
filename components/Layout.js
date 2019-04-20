import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './shared/AppBar';

const useStyles = () => ({
  main: {
    maxWidth: 1920,
    margin: 'auto'
  }
});

const Layout = ({ children, classes }) => (
  <React.Fragment>
    <AppBar />
    <main className={classes.main}>{children}</main>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Layout);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import AppBar from './shared/AppBar';

const useStyles = theme => ({
  main: {
    margin: 'auto',
    backgroundColor: '#ebedf3',
    minHeight: '100vh'
  }
});

const Layout = ({ children, classes }) => (
  <React.Fragment>
    <AppBar />
    <main className={classes.main}>{children}</main>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Layout);

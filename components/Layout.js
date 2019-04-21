import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './shared/AppBar';
import User from './shared/User';

const useStyles = () => ({
  main: {
    maxWidth: 1920,
    margin: 'auto'
  }
});

const Layout = ({ children, classes }) => (
  <User>
    {({ data: { me } }) => (
      <React.Fragment>
        <AppBar user={me} />
        <main 
          className={classes.main}
        >
          {children}
        </main>
      </React.Fragment>
    )}
  </User>
);

Layout.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Layout);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';

const useStyles = theme => ({
  main: {
    maxWidth: 1920,
    margin: 'auto',
  },
});

const Layout = ({ auth, children, classes, ...props }) => {
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const isLoggedIn = auth;

    if (isLoggedIn) {
      const user = auth.getAccessToken();
      setUserToken(user)
    }

  });

  return (
    <React.Fragment>
      <AppBar auth={props.auth} />
      <main className={classes.main}>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Layout);

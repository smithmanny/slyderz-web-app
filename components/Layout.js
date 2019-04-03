import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';

const useStyles = () => ({
  main: {
    maxWidth: 1920,
    margin: 'auto',
  },
});

function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

const Layout = ({ auth, children, classes }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userProfile = parseCookies().auth0_profile;
    setUser(userProfile);
  }, [user]);

  return (
    <React.Fragment>
      <AppBar auth={auth} user={user} />
      <main className={classes.main}>
        {children}
      </main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Layout);

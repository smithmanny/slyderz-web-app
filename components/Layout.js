import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  main: {
    padding: '40px 24px',
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const [user, setUser] = useState(true);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Slyderz
            </Typography>

            {user && (
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <main className={classes.main}>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Layout;

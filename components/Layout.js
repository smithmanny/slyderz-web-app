import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import SignUpForm from './form/SignUpForm';

const useStyles = theme => ({
  main: {
    padding: '40px 24px',
    maxWidth: 1032,
    margin: 'auto',
  },
  menuItem: {
    marginLeft: theme.spacing.unit * 3,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  modal: {
    position: 'absolute',
    width: 568,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Layout = ({ children, classes }) => {
  const [user, setUser] = useState(false);
  const [signUpModal, openSignUpModal] = useState(false);

  const handleClose = () => openSignUpModal(false);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Slyderz
            </Typography>

            {!user && (
              <React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.menuItem}
                  onClick={() => openSignUpModal(true)}
                >
                  Sign Up
                </Button>
                <Button variant="contained" color="secondary" className={classes.menuItem}>
                  Log In
                </Button>
              </React.Fragment>
            )}

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={signUpModal}
              onClose={handleClose}
            >
              <div style={getModalStyle()} className={classes.modal}>
                <SignUpForm handleClose={handleClose} />
              </div>
            </Modal>

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
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Layout);

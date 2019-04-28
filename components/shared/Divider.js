/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { default as MuiDivider } from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  divider: {
    width: '100%'
  }
});

const Divider = ({ classes, ...props }) => (
  <MuiDivider className={classes.divider} {...props} />
);

Divider.propTypes = {
  classes: PropTypes.shape()
};

export default withStyles(styles)(Divider);

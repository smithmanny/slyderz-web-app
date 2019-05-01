import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  content: {
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px `
  }
});

const Content = ({ classes, children }) => (
  <div className={classes.content}>{children}</div>
);

Content.propTypes = {
  children: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Content);

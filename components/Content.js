import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
  content: {
    padding: theme.spacing(5, 2)
  }
});

const Content = ({ classes, children }) => (
  <div className={classes.content}>{children}</div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(useStyles)(Content);

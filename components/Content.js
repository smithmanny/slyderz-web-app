import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  content: {
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 5,
    },
  },
});

const Content = ({ classes, children }) => {
  return (
    <Grid className={classes.content}>
      {children}
    </Grid>
  )
}

Content.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Content);

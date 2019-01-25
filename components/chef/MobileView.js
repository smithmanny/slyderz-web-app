import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
  headerImage: {
    background: '/static/food.jpg',
    height: 150,
    width: '100%'
  },
}

const MobileView = ({ classes }) => {
  return (
    <Grid container>
      <Grid item xs={12} className={classes.headerImage}>
        Picture goes here
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MobileView);
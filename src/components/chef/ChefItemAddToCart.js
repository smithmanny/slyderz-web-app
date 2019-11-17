import React from 'react';
import PropTypes from 'prop-types';

import { Button, Fab, Grid, Typography, withStyles } from '../core';
import { AddIcon, RemoveIcon } from '../icons';
import chefItemAddToCartStyles from '../../assets/styles/consumer/chef/chefItemAddToCartStyles';

const ChefItemAddToCart = ({ classes }) => {
  const l = null;
  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs={4}>
        <div className={classes.quantity}>
          <Fab size="small" aria-label="remove-item">
            <RemoveIcon />
          </Fab>
          <Typography variant="body1">1</Typography>
          <Fab size="small" aria-label="add-item">
            <AddIcon />
          </Fab>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Add 1 to Order <span className={classes.price}>$10.99</span>
        </Button>
      </Grid>
    </Grid>
  );
};

ChefItemAddToCart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(chefItemAddToCartStyles)(ChefItemAddToCart);

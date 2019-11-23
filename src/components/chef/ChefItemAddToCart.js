import React from 'react';

import { Button, Fab, Grid, Typography } from '../core';
import { AddIcon, RemoveIcon } from '../../assets/icons';
import chefItemAddToCartStyles from '../../assets/styles/consumer/chef/chefItemAddToCartStyles';

const ChefItemAddToCart = () => {
  const classes = chefItemAddToCartStyles();
  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs={12} md={4}>
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
      <Grid item xs={12} md={8}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          classes={{ endIcon: classes.price }}
          className={classes.button}
          endIcon="$10.99"
        >
          Add 1 to Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChefItemAddToCart;

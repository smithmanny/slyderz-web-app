import React, { useState } from 'react';

import { Button, Fab } from '../core';
import Typography from '../core/Typography';
import Grid from '../core/Grid';
import { AddIcon, RemoveIcon } from '../../assets/icons';
import chefItemAddToCartStyles from '../../assets/styles/consumer/chef/chefItemAddToCartStyles';

const ChefItemAddToCart = () => {
  const classes = chefItemAddToCartStyles();
  const [itemTotal, setItemTotal] = useState(1);

  const decrement = () => {
    if (itemTotal === 1) {
      return setItemTotal(1);
    }
    setItemTotal(prevTotal => prevTotal - 1);
  };

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs={12} md={4}>
        <div className={classes.quantity}>
          <Fab size="small" aria-label="remove-item" onClick={decrement}>
            <RemoveIcon />
          </Fab>
          <Typography variant="body1">{itemTotal}</Typography>
          <Fab
            size="small"
            aria-label="add-item"
            onClick={() => setItemTotal(prevTotal => prevTotal + 1)}
          >
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

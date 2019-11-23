import React from 'react';

import { Divider, Typography } from '../core';
import ChefItemAddToCart from './ChefItemAddToCart';
import ChefItemCardModalStyles from '../../assets/styles/consumer/chef/chefItemCardModalStyles';

const ChefItemCardModal = () => {
  const classes = ChefItemCardModalStyles();
  return (
    <>
      <img src="/static/food.jpg" alt="Food" className={classes.image} />
      <div className={classes.content}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Dish Title Here
        </Typography>
        <Typography paragraph>Dish title description will go here</Typography>
        <Divider />
      </div>
      <ChefItemAddToCart />
    </>
  );
};

export default ChefItemCardModal;

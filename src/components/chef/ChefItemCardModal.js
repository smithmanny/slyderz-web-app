import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Typography, withStyles } from '../core';
import ChefItemAddToCart from './ChefItemAddToCart';
import ChefItemCardModalStyles from '../../assets/styles/consumer/chef/chefItemCardModalStyles';

const ChefItemCardModal = ({ classes }) => (
  <React.Fragment>
    <img src="/static/food.jpg" alt="Food" className={classes.image} />
    <div className={classes.content}>
      <Typography className={classes.title} variant="h5" gutterBottom>
        Dish Title Here
      </Typography>
      <Typography paragraph>Dish title description will go here</Typography>
      <Divider />
    </div>
    <ChefItemAddToCart />
  </React.Fragment>
);

ChefItemCardModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(ChefItemCardModalStyles)(ChefItemCardModal);

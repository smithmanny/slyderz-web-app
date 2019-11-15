import React from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from '../core';
import ChefItemCardModalStyles from '../../assets/styles/consumer/chef/chefItemCardModalStyles';

const ChefItemCardModal = ({ classes }) => (
  <React.Fragment>
    <img
      src="/static/food.jpg"
      alt="Food"
      style={{ width: '100%', height: '100%' }}
    />
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom>
        Dish Title Here
      </Typography>
      <Typography paragraph>Dish title description will go here</Typography>
    </div>
  </React.Fragment>
);

ChefItemCardModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(ChefItemCardModalStyles)(ChefItemCardModal);

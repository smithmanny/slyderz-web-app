import React from 'react';
import PropTypes from 'prop-types';

import { Button, Paper, Typography } from '../core';
import Orders from './Orders';

const CheckoutCartModal = ({ classes }) => (
  <Paper className={classes.modal}>
    <Typography variant="h4" gutterBottom>
      Your Order
    </Typography>
    <Typography className="chef" variant="body1" color="textSecondary">
      Order cooked by Shakhor
    </Typography>
    <Orders classes={classes} />
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.checkoutBtn}
    >
      Next: Reserve <span className={classes.orderTotal}>$10.99</span>
    </Button>
  </Paper>
);

CheckoutCartModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CheckoutCartModal;

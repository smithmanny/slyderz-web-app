import React from 'react';
import PropTypes from 'prop-types';

import { Button, Paper, Link, Typography } from '../core';
import { CloseIcon } from '../../assets/icons';
import Orders from './Orders';

const CheckoutCartModal = ({ classes, handleCartModal }) => (
  <Paper className={classes.modal}>
    <CloseIcon
      aria-label="Close checkout cart"
      className={classes.close}
      fontSize="small"
      onClick={handleCartModal}
    />
    <Typography variant="h4" gutterBottom>
      Your Order
    </Typography>
    <Typography className="chef" variant="body1" color="textSecondary">
      Order cooked by Shakhor
    </Typography>
    <Orders />
    <Link href="/checkout">
      <a>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.checkoutBtn}
        >
          Next: Reserve <span className={classes.orderTotal}>$10.99</span>
        </Button>
      </a>
    </Link>
  </Paper>
);

CheckoutCartModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCartModal: PropTypes.func.isRequired
};

export default CheckoutCartModal;

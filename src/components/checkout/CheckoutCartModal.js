import React from 'react';
import PropTypes from 'prop-types';

import { Button, Paper, Link } from '../core';
import Typography from '../core/Typography';
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
          classes={{ endIcon: classes.orderTotal }}
          className={classes.checkoutBtn}
          endIcon="10.99"
        >
          Next: Reserve
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

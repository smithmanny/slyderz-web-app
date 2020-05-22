import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Button from '../../shared/Button';
import Paper from '../../shared/Paper';
import Typography from '../../shared/Typography';
import { CloseIcon } from '../../../assets/icons';
import Order from '../order';
import checkoutCartModalStyles from './styles'

const CheckoutCartModal = () => {
  const classes = checkoutCartModalStyles();
  return (
    <Paper className={classes.modal}>
      <CloseIcon
        aria-label="Close checkout cart"
        className={classes.close}
        fontSize="small"
      // onClick={closeCartModal}
      />
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>
      <Typography className="chef" variant="body1" color="textSecondary">
        Order cooked by Shakhor
      </Typography>
      <Order />
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
}

CheckoutCartModal.propTypes = {
  classes: PropTypes.object.isRequired,
  closeCartModal: PropTypes.func.isRequired
};

export default CheckoutCartModal;

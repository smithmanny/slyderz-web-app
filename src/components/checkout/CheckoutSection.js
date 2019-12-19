import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Fab } from '../core';
import Divider from '../core/Divider';
import Typography from '../core/Typography';
import checkoutSectionStyles from '../../assets/styles/consumer/checkout/checkoutSectionStyles';
import LocationModal from './LocationModal';
import PaymentModal from './PaymentModal';

const CheckoutSection = ({ buttonText, children, title }) => {
  const classes = checkoutSectionStyles();
  const [openLocationModal, showLocationModal] = useState(false);
  const [openPaymentModal, showPaymentModal] = useState(false);

  const openModal = () => {
    switch (title) {
      case 'Choose Address':
        return showLocationModal(true);
      case 'Payment':
        return showPaymentModal(true);
      default:
        return null;
    }
  };
  return (
    <>
      <section className={classes.section}>
        <span className={classes.heading}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Fab
            onClick={openModal}
            variant="extended"
            size="medium"
            aria-label="edit"
          >
            {buttonText || 'Edit'}
          </Fab>
        </span>
        <Divider className={classes.divider} />
        {children}
      </section>
      <LocationModal
        classes={classes}
        aria-labelledby="User Location Modal"
        aria-describedby="Modal to add location"
        open={openLocationModal}
        onClose={() => showLocationModal(false)}
      />
      <PaymentModal
        classes={classes}
        aria-labelledby="User Payment Modal"
        aria-describedby="Modal to add payment information"
        open={openPaymentModal}
        onClose={() => showPaymentModal(false)}
      />
    </>
  );
};

CheckoutSection.defaultProps = {
  buttonText: 'Edit'
};

CheckoutSection.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired
};

export default CheckoutSection;

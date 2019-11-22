import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Fab, Typography, withStyles } from '../core';
import checkoutSectionStyles from '../../assets/styles/consumer/checkout/checkoutSectionStyles';

const CheckoutSection = ({
  buttonText,
  buttonOnClick,
  children,
  classes,
  title
}) => (
  <section className={classes.section}>
    <span className={classes.heading}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Fab
        variant="extended"
        size="medium"
        aria-label="edit"
        {...buttonOnClick}
      >
        {buttonText || 'Edit'}
      </Fab>
    </span>
    <Divider className={classes.divider} />
    {children}
  </section>
);

CheckoutSection.defaultProps = {
  buttonText: 'Edit'
};

CheckoutSection.propTypes = {
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(checkoutSectionStyles)(CheckoutSection);

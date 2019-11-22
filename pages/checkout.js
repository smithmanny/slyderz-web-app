import React from 'react';
import PropTypes from 'prop-types';

import { AppContainer } from '../src/components/layouts';
import {
  Button,
  Grid,
  Typography,
  withStyles,
  Divider
} from '../src/components/core';
import CheckoutSection from '../src/components/checkout/CheckoutSection';
import checkoutStyles from '../src/assets/styles/consumer/checkout/checkoutStyles';
import { EventIcon, LocationIcon, PersonIcon } from '../src/assets/icons';
import Orders from '../src/components/checkout/Orders';

const Checkout = ({ classes }) => (
  <AppContainer>
    <Grid className={classes.container} container spacing={4}>
      <Grid item xs={12} md={7}>
        <div className={classes.leftContainer}>
          <CheckoutSection title="Choose Address">
            <Typography variant="subtitle1">4288</Typography>
          </CheckoutSection>
          <CheckoutSection title="Payment">
            <Typography variant="subtitle1">••••7106</Typography>
          </CheckoutSection>
          <CheckoutSection title="Items">
            <Orders />
          </CheckoutSection>
        </div>
      </Grid>

      <Grid item xs={12} md={5}>
        <div className={classes.rightContainer}>
          <section className={classes.checkoutItem}>
            <PersonIcon />
            <Typography variant="subtitle1">1 item from Shakhor</Typography>
          </section>
          <section className={classes.checkoutItem}>
            <EventIcon />
            <Typography variant="subtitle1">
              November 10, 2019 3:30pm
            </Typography>
          </section>
          <section className={classes.checkoutItem}>
            <LocationIcon />
            <Typography variant="subtitle1">
              Event location at 4288 Leola Road
            </Typography>
          </section>
          <Divider />
          <div className={classes.totalContainer}>
            <span>
              <Typography className="title" variant="subtitle1">
                Subtotal
              </Typography>
              <Typography className="price" variant="subtitle1">
                $15
              </Typography>
            </span>
            <span>
              <Typography className="title" variant="subtitle1">
                Service Fee
              </Typography>
              <Typography className="price" variant="subtitle1">
                $2
              </Typography>
            </span>
            <span>
              <Typography className="title" variant="subtitle1">
                Total
              </Typography>
              <Typography className="price" variant="subtitle1">
                $17
              </Typography>
            </span>
          </div>
          <Button color="primary" variant="contained" size="large" fullWidth>
            Reserve
          </Button>
        </div>
      </Grid>
    </Grid>
  </AppContainer>
);

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(checkoutStyles)(Checkout);

import React from 'react';

import { EventIcon, LocationIcon, PersonIcon } from '../src/assets/icons';
import checkoutStyles from '../src/assets/styles/consumer/checkout/checkoutStyles';

import { AppContainer } from '../src/components/layouts';
import { Button } from '../src/components/core';
import Divider from '../src/components/core/Divider';
import Grid from '../src/components/core/Grid';
import Typography from '../src/components/core/Typography';
import BasicForm, { DatePickerField, TimePickerField } from '../src/components/form';
import CheckoutSection from '../src/components/checkout/CheckoutSection';
import Orders from '../src/components/checkout/Orders';

const Checkout = () => {
  const classes = checkoutStyles();
  const today = new Date();
  return (
    <AppContainer>
      <BasicForm
        defaultValues={{
          eventDate: today,
          eventTime: today,
        }}
        mutate={{
          toVariables: variables => ({
            ...variables
          })
        }}
      >
        {({ values }) => (
          <Grid className={classes.container} container>
            <Grid item xs={12} md={7}>
              <div className={classes.leftContainer}>
                <CheckoutSection title="Choose Address">
                  <Typography variant="subtitle1">4288 Leola Road, Douglasville, GA, 30135</Typography>
                </CheckoutSection>
                <CheckoutSection title="Event Date and Time">
                  <div className={classes.bookingInfo}>
                    <DatePickerField name="eventDate" label="Event Date" />
                    <TimePickerField name="eventTime" label="Event time" />
                  </div>
                </CheckoutSection>
                {/* <CheckoutSection title="Payment">
                  <Typography variant="subtitle1">••••7106</Typography>
                </CheckoutSection> */}
                <CheckoutSection title="Items">
                  <Orders />
                </CheckoutSection>
              </div>
            </Grid>

            <Grid item xs={12} md={5}>
              <div className={classes.rightContainer}>
                <section className={classes.checkoutItem}>
                  <PersonIcon />
                  <Typography variant="subtitle1">
                    1 item from Shakhor
                  </Typography>
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
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Checkout
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </BasicForm>
    </AppContainer>
  );
};

export default Checkout;

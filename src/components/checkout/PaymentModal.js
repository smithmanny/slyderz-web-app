import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../core';
import Typography from '../core/Typography';
import Grid from '../core/Grid';
import { BasicModal } from '../shared';
import BasicForm, { TextField } from '../form';

const PaymentModal = ({ classes, ...props }) => (
  <BasicModal {...props}>
    <BasicForm>
      {({ values }) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              className={classes.modalTitle}
              variant="h5"
              align="center"
            >
              Add Payment Option
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="cardNumber"
              variant="outlined"
              label="Card Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="expiration" variant="outlined" label="MM/YY" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="cvv" variant="outlined" label="CVV" />
          </Grid>
          <Grid item xs={12}>
            <TextField name="postalCode" variant="outlined" label="Zip Code" />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" size="large" fullWidth>
              Add Payment
            </Button>
          </Grid>
        </Grid>
      )}
    </BasicForm>
  </BasicModal>
);

PaymentModal.propTypes = {
  classes: PropTypes.shape()
};

export default PaymentModal;

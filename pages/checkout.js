import React from 'react';
import PropTypes from 'prop-types';

import { AppContainer } from '../src/components/layouts';
import { Grid } from '../src/components/core';

const Checkout = () => (
  <AppContainer>
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <h1>Checkout</h1>
      </Grid>
      <Grid item xs={4}>
        <h1>Side Bar</h1>
      </Grid>
    </Grid>
  </AppContainer>
);

export default Checkout;

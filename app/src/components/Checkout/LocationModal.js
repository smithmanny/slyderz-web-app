import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../shared';
import Typography from '../shared/Typography';
import Grid from '../shared/Grid';
import BasicModal from '../shared/BasicModal';
import BasicForm, { TextField } from '../Form';

const LocationModal = ({ classes, ...props }) => (
  <BasicModal {...props}>
    <BasicForm>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            className={classes.modalTitle}
            variant="h5"
            align="center"
          >
            Choose an Address
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="streetAddress"
            variant="outlined"
            label="Street Address"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="streetAddress2"
            variant="outlined"
            label="Apartment, suite, building, etc."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="city" variant="outlined" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="state" variant="outlined" label="State" />
        </Grid>
        <Grid item xs={12}>
          <TextField name="postalCode" variant="outlined" label="Zip Code" />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" size="large" fullWidth>
            Add Address
          </Button>
        </Grid>
      </Grid>
    </BasicForm>
  </BasicModal>
);

LocationModal.propTypes = {
  classes: PropTypes.shape()
};

export default LocationModal;

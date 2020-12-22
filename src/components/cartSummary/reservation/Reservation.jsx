import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, Clock, MapMarker } from "mdi-material-ui";

import reservationStyles from "./styles";

import { DatePickerField, TextField, TimePickerField } from "../../form";
import Grid from "../../shared/Grid";
import Typography from "../../shared/Typography";

const Reservation = () => {
  const classes = reservationStyles();
  return (
    <Grid container spacing={1} className={classes.container}>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">Serving Address</Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MapMarker />
              </InputAdornment>
            ),
          }}
          name="address"
          placeholder="123 Olive Street ..."
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">Date</Typography>
        <DatePickerField
          name="date"
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">Time</Typography>
        <TimePickerField
          name="time"
          textFieldProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <Clock />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default Reservation;

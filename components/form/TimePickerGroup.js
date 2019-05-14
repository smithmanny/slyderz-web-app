import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const TimePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <TimePicker
      value={field.value}
      onError={error => console.log(error)}
      onChange={time => form.setFieldValue(field.name, time, true)}
      {...other}
    />
  );
};

const TimPickerGroup = () => (
  <FormControl fullWidth margin="normal">
    <Typography variant="body1" gutterBottom>
      Event Time
    </Typography>
    <Field name="eventTime" component={TimePickerField} />
  </FormControl>
);

TimePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

export default TimPickerGroup;

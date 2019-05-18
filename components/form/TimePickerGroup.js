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

TimePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

const TimPickerGroup = ({ label }) => (
  <FormControl fullWidth margin="normal">
    <Typography variant="body1" gutterBottom>
      {label}
    </Typography>
    <Field name="eventTime" component={TimePickerField} />
  </FormControl>
);

TimPickerGroup.defaultProps = {
  label: null
};

TimPickerGroup.propTypes = {
  label: PropTypes.string
};

export default TimPickerGroup;

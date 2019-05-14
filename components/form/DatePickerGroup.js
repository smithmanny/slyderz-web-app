import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { DatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      disablePast
      name={field.name}
      value={field.value}
      format="MM/dd/yyyy"
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      {...other}
    />
  );
};

const DatePickerGroup = () => (
  <FormControl fullWidth margin="normal">
    <Typography variant="body1" gutterBottom>
      Event Date
    </Typography>
    <Field name="eventDate" component={DatePickerField} />
  </FormControl>
);

DatePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

export default DatePickerGroup;

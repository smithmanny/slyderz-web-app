import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="MM/dd/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      mask={value =>
        value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
      }
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
  field: PropTypes.string.isRequired,
  form: PropTypes.func.isRequired
};

export default DatePickerGroup;

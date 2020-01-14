import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePickerInput = ({ field, form, ...props }) => (
  <KeyboardDatePicker
    {...field}
    id={field.name}
    disablePast
    disableToolbar
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    onChange={(_, date) => form.setFieldValue(field.name, date, false)}
    KeyboardButtonProps={{
      'aria-label': 'Date picker'
    }}
    {...props}
  />
);

DatePickerInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func
  }).isRequired
};

const DatePickerGroup = ({ ...props }) => (
  <Field component={DatePickerInput} {...props} />
);

DatePickerGroup.propTypes = {
  name: PropTypes.string.isRequired
};

export default DatePickerGroup;

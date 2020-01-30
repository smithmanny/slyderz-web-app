import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { DatePicker } from '@material-ui/pickers';

const DatePickerInput = ({ field, form, ...props }) => (
  <DatePicker
    {...field}
    autoOk
    clearable
    id={field.name}
    disablePast
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    initialFocusedDate={new Date()}
    onChange={date => form.setFieldValue(field.name, date, false)}
    value={field.value}
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

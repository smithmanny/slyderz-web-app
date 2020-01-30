import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TimePicker } from '@material-ui/pickers';

const TimePickerInput = ({ field, form, ...props }) => (
  <TimePicker
    {...field}
    autoOk
    clearable
    id={field.name}
    margin="normal"
    initialFocusedDate={new Date()}
    onChange={date => form.setFieldValue(field.name, date, false)}
    value={field.value}
    {...props}
  />
);

TimePickerInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func
  }).isRequired
};

const TimePickerGroup = ({ ...props }) => (
  <Field component={TimePickerInput} {...props} />
);

TimePickerGroup.propTypes = {
  name: PropTypes.string.isRequired
};

export default TimePickerGroup;

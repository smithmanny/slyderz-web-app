import React from 'react';
import { Field } from 'formik';

const TimPickerGroup = ({ ...props }) => (
  <Field name="eventTime" type="date" {...props} />
);

export default TimPickerGroup;

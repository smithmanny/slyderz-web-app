import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import textFieldStyles from '../../assets/styles/consumer/textFieldGroupStyles';

const TextFieldGroup = ({ name, ...props }) => {
  const classes = textFieldStyles();
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <TextField
          {...field}
          error={meta.touched && meta.error}
          className={classes.textField}
          margin="normal"
          onChange={event => {
            form.setFieldValue(name, event.target.value);
          }}
          helperText={meta.touched && meta.error}
          {...props}
        />
      )}
    </Field>
  );
};

TextFieldGroup.propTypes = {
  props: PropTypes.object,
  name: PropTypes.string.isRequired
};

export default TextFieldGroup;

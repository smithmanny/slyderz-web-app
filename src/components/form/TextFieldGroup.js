import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import textFieldStyles from '../../assets/styles/consumer/textFieldGroupStyles';

const TextFieldGroup = ({ name, ...props }) => {
  const classes = textFieldStyles();
  return (
    <Field
      className={classes.textField}
      name={name}
      margin="normal"
      component={TextField}
      {...props}
    />
  );
};

TextFieldGroup.propTypes = {
  props: PropTypes.object,
  name: PropTypes.string.isRequired
};

export default TextFieldGroup;

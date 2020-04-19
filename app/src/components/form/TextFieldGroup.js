import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from "react-hook-form"
import TextField from '@material-ui/core/TextField';

const TextFieldGroup = ({ name, ...props }) => {
  const { errors, register } = useFormContext()
  return (
    <TextField
      name={name}
      error={errors[name] && errors[name].message}
      margin="normal"
      inputRef={register}
      helperText={errors[name] && errors[name].message}
      {...props}
    />
  );
};

TextFieldGroup.propTypes = {
  props: PropTypes.object,
  name: PropTypes.string.isRequired
};

export default TextFieldGroup;

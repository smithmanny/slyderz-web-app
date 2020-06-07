import React, { useState } from 'react';
import { TextField } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form";
import { TimePicker } from '@material-ui/pickers';

const TimePickerGroup = ({ name, textFieldProps, ...timePickerProps }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { control } = useForm();
  const timePickerTextFieldProps = {
    fullWidth: true,
    margin: 'normal',
    variant: 'outlined',
    ...textFieldProps,
  }
  return (
    <Controller
      as={
        <TimePicker />
      }
      autoOk
      clearable
      renderInput={props => <TextField {...props} {...timePickerTextFieldProps} />}
      value={selectedDate}
      name={name}
      control={control}
      onChange={date => handleDateChange(date)}
      {...timePickerProps}
    />
  )
};

export default TimePickerGroup;
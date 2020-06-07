import React, { useState } from 'react';
import { TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from '@material-ui/pickers';

const DatePickerGroup = ({ name, textFieldProps, ...datePickerProps }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { control } = useForm();
  const datePickerTextFieldProps = {
    fullWidth: true,
    margin: 'normal',
    variant: 'outlined',
    ...textFieldProps,
  }
  return (
    <Controller
      as={
        <DatePicker />
      }
      clearable
      disablePast
      renderInput={props => <TextField {...props} {...datePickerTextFieldProps} />}
      value={selectedDate}
      views={['month', 'date']}
      name={name}
      control={control}
      onChange={date => handleDateChange(date)}
      {...datePickerProps}
    />
  )
};

export default DatePickerGroup;

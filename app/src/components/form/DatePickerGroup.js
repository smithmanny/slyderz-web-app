import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { KeyboardDatePicker } from '@material-ui/pickers';


const DatePickerGroup = ({ name }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { control } = useForm();
  return (
    <Controller
      as={
      <KeyboardDatePicker
        autoOk
        clearable
        id={name}
        disablePast
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
      />
    }
      name={name}
      control={control}
      onChange={date => handleDateChange(date)}
      defaultValue={selectedDate}
    />
  )
};

export default DatePickerGroup;

import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { KeyboardTimePicker } from '@material-ui/pickers';

const TimePickerGroup = ({ name }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { control } = useForm();
  return (
    <Controller
      as={
      <KeyboardTimePicker
        autoOk
        clearable
        margin="normal"
        initialFocusedDate={new Date()}
      />
    }
      name={name}
      control={control}
      onChange={date => handleDateChange(date)}
      defaultValue={{}}
    />
  )
};

export default TimePickerGroup;
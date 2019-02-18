import React from 'react';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectGroup = ({ name }) => (
  <FormControl fullWidth>
    <Field 
      name={`order-${name}`}
      render={({ field }) => (
        <Select
        {...field}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      )}  
    />
  </FormControl>
)

export default SelectGroup;
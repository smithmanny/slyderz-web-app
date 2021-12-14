import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectGroup = ({ name }) => (
  <FormControl fullWidth>
    <Field
      name={name}
      render={({ field }) => (
        <Select {...field}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      )}
    />
  </FormControl>
);

SelectGroup.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
};

export default SelectGroup;

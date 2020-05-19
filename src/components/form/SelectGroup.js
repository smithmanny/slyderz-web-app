import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';


const SelectGroup = ({ name }) => {
  const { control } = useForm();
  return (
    <Controller
      as={<Select />}
      name={name}
      control={control}
      onChange={([selected]) => {
        // React Select return object instead of value for selection
        return { value: selected };
      }}
      defaultValue={{}}
    />
  )
};

SelectGroup.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
};

export default SelectGroup;

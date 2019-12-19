import React, { useState } from 'react';

import { MenuItem } from '../core';
import Typography from '../core/Typography';
import { Select } from '../form';
import ordersStyles from '../../assets/styles/consumer/ordersStyles';

const Orders = () => {
  const classes = ordersStyles();
  const [quantity, setQuantity] = useState(1);

  const handleChange = event => {
    setQuantity(event.target.value);
  };
  return (
    <div className={classes.orderContainer}>
      <Select
        label-id="demo-simple-select-label"
        id="demo-simple-select"
        value={quantity}
        onChange={handleChange}
      >
        <MenuItem value={0}>Remove</MenuItem>
        <MenuItem value={1}>1</MenuItem>
      </Select>
      <Typography className="dishName" variant="body1">
        The Ultimate Salad
      </Typography>
      <Typography variant="body1">$10.99</Typography>
    </div>
  );
};

export default Orders;

import React, { useState } from 'react';

import { MenuItem } from '../../shared';
import Typography from '../../shared/Typography';
import { Select } from '../../Form';
import ordersStyles from './styles';

const Order = () => {
  const classes = ordersStyles();
  const [quantity, setQuantity] = useState(1);

  const handleChange = event => {
    setQuantity(event.target.value);
  };
  return (
    <div className={classes.orderContainer}>
      {/* <Select
        label-id="demo-simple-select-label"
        id="demo-simple-select"
        value={quantity}
        onChange={handleChange}
      >
        <MenuItem value={0}>Remove</MenuItem>
        <MenuItem value={1}>1</MenuItem>
      </Select> */}
      <Typography className="dishName" variant="body1">
        The Ultimate Salad
      </Typography>
      <Typography variant="body1">$10.99</Typography>
    </div>
  );
};

export default Order;
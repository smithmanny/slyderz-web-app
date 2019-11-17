import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, Typography } from '../core';

const Orders = ({ classes }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = event => {
    setQuantity(event.target.value);
  };
  return (
    <div className={classes.orderContainer}>
      <Select
        labelId="demo-simple-select-label"
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

Orders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Orders;

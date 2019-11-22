import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, Typography, withStyles } from '../core';
import ordersStyles from '../../assets/styles/consumer/ordersStyles';

const Orders = ({ classes }) => {
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

Orders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(ordersStyles)(Orders);

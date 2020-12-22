import React from "react";

import styles from "./style";

import Grid from "../../shared/Grid";
import Typography from "../../shared/Typography";

const CartItems = ({ selectedCartItems }) => {
  const classes = styles();
  return selectedCartItems.map((item) => (
    <Grid key={item.id} container className={classes.container}>
      <Grid item xs={6}>
        <Typography>{item.name}</Typography>
      </Grid>
      <Grid item xs>
        <Typography>x{item.quantity}</Typography>
      </Grid>
      <Grid item xs>
        <Typography>${item.quantity * item.price}</Typography>
      </Grid>
    </Grid>
  ));
};

export default CartItems;

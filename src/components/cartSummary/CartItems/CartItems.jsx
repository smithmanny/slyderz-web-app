import React from "react";
import { useDispatch } from "react-redux";

import styles from "./style";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../../libs/redux/reducers/cartReducer";

import Button from "../../shared/Button";
import Grid from "../../shared/Grid";
import Typography from "../../shared/Typography";

const CartItems = ({ selectedCartItems }) => {
  const classes = styles();
  const dispatch = useDispatch();
  return selectedCartItems.map((item) => (
    <Grid key={item.id} container className={classes.container}>
      <Grid item xs={4}>
        <Typography>{item.name}</Typography>
      </Grid>
      <Grid item xs>
        <div className={classes.quantityContainer}>
          <Button
            variant="xs"
            onClick={() => dispatch(decreaseQuantity({ ...item, quantity: 1 }))}
          >
            -
          </Button>
          <Button
            variant="xs"
            onClick={() => dispatch(increaseQuantity({ ...item, quantity: 1 }))}
          >
            +
          </Button>
          <Typography variant="h6">x{item.quantity}</Typography>
        </div>
      </Grid>
      <Grid item xs>
        <Typography className={classes.price}>
          ${item.quantity * item.price}
        </Typography>
      </Grid>
    </Grid>
  ));
};

export default CartItems;

import { useMutation } from "blitz"

import styles from "./styles";
import destroyMenuItemMutation from 'app/chefs/mutations/destroyMenuItem';
import decreaseMenuItemQuantityMutation from 'app/chefs/mutations/decreaseMenuItemQuantity';
import increaseMenuItemQuantityMutation from 'app/chefs/mutations/increaseMenuItemQuantity';

import Divider from 'app/core/components/shared/Divider'
import Typography from 'app/core/components/shared/Typography'
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import React from "react";

const CartItems = ({ selectedCartItems }) => {
  const classes = styles();
  const [destroyMenuItem] = useMutation(destroyMenuItemMutation);
  const [decreaseMenuItemQuantity] = useMutation(decreaseMenuItemQuantityMutation);
  const [increaseMenuItemQuantity] = useMutation(increaseMenuItemQuantityMutation);

  return selectedCartItems.map((item) => (
    <span key={item.id}>
      <Grid key={item.id} container className={classes.container}>
        <Grid item xs={4}>
          <Typography variant="body2">{item.name}</Typography>
        </Grid>
        <Grid item xs>
          <div className={classes.quantityContainer}>
            <Button
              variant="text"
              onClick={() => decreaseMenuItemQuantity({ id: item.id, quantity: 1 })}
            >
              -
            </Button>
            <Button
              variant="text"
              onClick={() => increaseMenuItemQuantity({ id: item.id, quantity: 1 })}
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
      <Button
        variant="text"
        size="small"
        onClick={() => destroyMenuItem({ menuItemId: item.id })}
        >
          Delete
        </Button>
      <Divider />
    </span>
  ));
};

export default CartItems;
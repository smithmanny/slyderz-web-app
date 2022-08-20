import { useMutation } from "@blitzjs/rpc";
import React from "react";

import destroyMenuItemMutation from 'app/chefs/mutations/destroyMenuItem';
import decreaseMenuItemQuantityMutation from 'app/chefs/mutations/decreaseMenuItemQuantity';
import increaseMenuItemQuantityMutation from 'app/chefs/mutations/increaseMenuItemQuantity';

import { styled } from "integrations/material-ui";

import Divider from 'app/core/components/shared/Divider'
import Typography from 'app/core/components/shared/Typography'
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";

const QuantityContainer = styled('div')({
  alignItems: "center",
  display: "flex",
})

const CartItems = ({ selectedCartItems }) => {
  const [destroyMenuItem] = useMutation(destroyMenuItemMutation);
  const [decreaseMenuItemQuantity] = useMutation(decreaseMenuItemQuantityMutation);
  const [increaseMenuItemQuantity] = useMutation(increaseMenuItemQuantityMutation);

  return selectedCartItems.map((item) => (
    <span key={item.id}>
      <Grid
        key={item.id}
        container
        sx={{
          alignItems: "center",
          flexDirection: 'row',
          paddingTop: 2,
        }}
      >
        <Grid item xs={4}>
          <Typography variant="body2">{item.name}</Typography>
        </Grid>
        <Grid item xs>
          <QuantityContainer>
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
            <Typography>x{item.quantity}</Typography>
          </QuantityContainer>
        </Grid>
        <Grid item xs>
          <Typography sx={{ float: "right" }}>
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
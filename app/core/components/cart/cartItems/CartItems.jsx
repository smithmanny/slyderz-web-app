import React from "react";

import { trpc } from "server/utils/trpc";

import Divider from 'app/core/components/shared/Divider'
import Typography from 'app/core/components/shared/Typography'
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import Box from "app/core/components/shared/Box";

const CartItems = ({ isCheckoutPage, selectedCartItems }) => {
  const destroyMenuItem = trpc.cart.deleteMenuItem.useMutation()
  const decreaseMenuItemQuantity = trpc.cart.decreaseMenuItemQuantity.useMutation()
  const increaseMenuItemQuantity = trpc.cart.increaseMenuItemQuantity.useMutation()

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
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              variant="text"
              onClick={() => decreaseMenuItemQuantity.mutate({ id: item.id, quantity: 1 })}
            >
              -
            </Button>
            <Button
              variant="text"
              onClick={() => increaseMenuItemQuantity.mutate({ id: item.id, quantity: 1 })}
            >
              +
            </Button>
            <Typography>x{item.quantity}</Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Typography sx={{ float: "right" }}>
            ${item.quantity * item.price}
          </Typography>
        </Grid>
      </Grid>
      {!isCheckoutPage && (
        <Button
          variant="text"
          size="small"
          onClick={() => destroyMenuItem.mutate({ menuItemId: item.id })}
        >
          Delete
        </Button>
      )}
      <Divider />
    </span>
  ));
};

export default CartItems;
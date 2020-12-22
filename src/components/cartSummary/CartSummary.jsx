import React from "react";
import { useSelector } from "react-redux";

import cartSummaryContainerStyles from "./styles";

import BasicForm from "../form";
import CartItems from "./CartItems";
import Grid from "../shared/Grid";
import Typography from "../shared/Typography";
import Button from "../shared/Button";
import ReservationSection from "./reservation";

const CartSummary = () => {
  const classes = cartSummaryContainerStyles();
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  let cartSum = 0;
  selectedCartItems.forEach((cart) => {
    cartSum += cart.price;
  });
  return (
    <div className={classes.root}>
      <BasicForm>
        <Typography variant="h4">Your Cart Info</Typography>
        <ReservationSection />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">Your Cart</Typography>
          </Grid>
        </Grid>
        {selectedCartItems.length > 0 && (
          <Grid container>
            <CartItems selectedCartItems={selectedCartItems} />
            <Grid item>
              <Typography variant="h5">Total: </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">&nbsp;${cartSum}</Typography>
            </Grid>
            <Grid className={classes.checkout} item xs={12}>
              <Button variant="contained" color="primary" size="large">
                Checkout
              </Button>
            </Grid>
          </Grid>
        )}
      </BasicForm>
    </div>
  );
};

export default CartSummary;

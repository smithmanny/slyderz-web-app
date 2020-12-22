import React from "react";
import { useSelector } from "react-redux";

import ConsumerContainer from "../src/components/consumerContainer";
import CartItems from "../src/components/cartSummary/CartItems";
import Typography from "../src/components/shared/Typography";

const Checkout = () => {
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  return (
    <ConsumerContainer maxWidth="lg">
      <Typography variant="h1">Checkout</Typography>
      <CartItems selectedCartItems={selectedCartItems} />
    </ConsumerContainer>
  );
};

export default Checkout;

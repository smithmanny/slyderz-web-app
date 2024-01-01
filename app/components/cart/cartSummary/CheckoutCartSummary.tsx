import React from "react";
import { useRouter } from "next/router";

import { formatNumberToCurrency } from "app/utils/time";
import { CONSUMER_SERVICE_FEE } from "types";
import { trpc } from "server/utils/trpc";

import Form from "app/components/legacy_form";
import Box from "app/components/shared/Box";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";
import CartItems from "../cartItems";

const CheckoutCartSummary = (props) => {
  const router = useRouter();
  const { data: cart } = trpc.cart.getUserCart.useQuery();
  const cartItems = cart?.items || [];
  const total = cart?.total || 0;
  const orderServiceFee: number = total * CONSUMER_SERVICE_FEE;
  const isCheckoutPage = router.asPath.includes("checkout");

  return (
    <Box sx={{ p: 2 }}>
      <Form>
        {cartItems?.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
              Your Items
            </Typography>
            <CartItems
              selectedCartItems={cartItems}
              isCheckoutPage={isCheckoutPage}
            />

            <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: "bold" }}>
              Subtotal:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(total)}
              </span>
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 0, fontWeight: "bold" }}>
              Service Fee:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(orderServiceFee)}
              </span>
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, fontWeight: "bold" }}>
              Total:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(total + orderServiceFee)}
              </span>
            </Typography>
          </Grid>
        )}
      </Form>
    </Box>
  );
};

export default CheckoutCartSummary;

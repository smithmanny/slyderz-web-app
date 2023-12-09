import React from "react";
import { useRouter } from "next/router";

import { trpc } from "server/utils/trpc";
import Stripe from "stripe";

import Box from "app/components/shared/Box";
import Button from "app/components/shared/Button";
import Typography from "app/components/shared/Typography";

interface StripeSavedCardsType {
  paymentMethods: Array<Stripe.PaymentMethod>;
}
function StripeSavedCards(props: StripeSavedCardsType) {
  const { paymentMethods } = props;
  const router = useRouter();
  const deletePaymentMethod = trpc.user.deletePaymentMethod.useMutation({
    onSuccess: () => {
      // TODO: update redux instead
      return router.reload();
    },
  });

  return (
    <React.Fragment>
      {paymentMethods.map((stripePaymentMethod) => (
        <Box
          key={stripePaymentMethod.id}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography>{stripePaymentMethod?.card?.last4}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 5,
            }}
          >
            <Button
              label="delete"
              variant="text"
              onClick={async () =>
                await deletePaymentMethod.mutateAsync({
                  paymentMethodId: stripePaymentMethod.id,
                })
              }
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </React.Fragment>
  );
}

export default StripeSavedCards;

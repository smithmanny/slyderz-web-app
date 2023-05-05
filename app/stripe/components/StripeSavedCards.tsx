import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { useMutation } from "@blitzjs/rpc";

import deletePaymentMethodMutation from "../../account/mutations/deletePaymentMethodMutation";

import Box from "app/core/components/shared/Box";
import Button from "app/core/components/shared/Button";
import Typography from "app/core/components/shared/Typography";

import { StripePaymentType } from "integrations/redux/reducers/userReduer";
interface StripeSavedCardsType {
  paymentMethods: Array<StripePaymentType>
}
function StripeSavedCards(props: StripeSavedCardsType) {
  const { paymentMethods } = props;
  const router = useRouter();
  const [deletePaymentMethod] = useMutation(deletePaymentMethodMutation, {
    onSuccess: () => {
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
          <Typography>{stripePaymentMethod.card.last4}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 5
            }}
          >
            <Button
              label="delete"
              variant="text"
              onClick={() => deletePaymentMethod(stripePaymentMethod.id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </React.Fragment>
  )
};

export default StripeSavedCards;

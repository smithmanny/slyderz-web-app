import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "@blitzjs/rpc";

import deletePaymentMethodMutation from "../../account/mutations/deletePaymentMethodMutation";

import Box from "app/core/components/shared/Box";
import Button from "app/core/components/shared/Button";
import Typography from "app/core/components/shared/Typography";

const StripeSavedCards = (props) => {
  const { paymentMethods } = props;
  const router = useRouter();
  const [deletePaymentMethod] = useMutation(deletePaymentMethodMutation, {
    onSuccess: () => {
      return router.reload();
    },
  });

  return (
    paymentMethods.map((stripePaymentMethod) => (
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
    ))
  )
};

export default StripeSavedCards;

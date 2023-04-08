import { useRouter } from "next/router";
import React, { useState, FunctionComponent } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useMutation } from "@blitzjs/rpc";

import deletePaymentMethodMutation from "../mutations/deletePaymentMethodMutation";
import { styled } from "integrations/material-ui";

import Box from "app/core/components/shared/Box"
import Button from "app/core/components/shared/Button"
import Typography from 'app/core/components/shared/Typography'

const StripePaymentSpan = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2)
}))

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

const StripeCard: FunctionComponent<any> = (props) => {
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [deletePaymentMethod] = useMutation(deletePaymentMethodMutation, {
    onSuccess: () => {
      return router.reload()
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error }: any = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/account`,
      }
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      router.reload()
    }
  };

  return (
    props.paymentMethods.length > 0 ? (
      props.paymentMethods.map(stripePaymentMethod => (
        <Box
          key={stripePaymentMethod.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1
          }}
        >
          <Typography>{stripePaymentMethod.card.last4}</Typography>
          <StripePaymentSpan>
            <Button
              label="delete"
              variant="text"
              onClick={() => deletePaymentMethod(stripePaymentMethod.id)}
            >
              Delete
            </Button>
          </StripePaymentSpan>
        </Box>
        ))
    ) : (
      <React.Fragment>
        <PaymentElement id="payment-element" />
        <Button label="save card" buttonType="submit" sx={{ mt: 2 }} onClick={handleSubmit}>
          Save Card
        </Button>
      </React.Fragment>
    )
  )
}

const StripeCardElement = (props) => {
  const { clientSecret, paymentMethods } = props;

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <React.Fragment>
      {clientSecret && (
        <Elements options={options} stripe={promise}>
          <StripeCard paymentMethods={paymentMethods} />
        </Elements>
      )}
    </React.Fragment>
  )
}

export default StripeCardElement;
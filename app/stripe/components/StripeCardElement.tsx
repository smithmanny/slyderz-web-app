import { useRouter } from "next/router";
import React, { useState, FunctionComponent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useQuery } from "@blitzjs/rpc";
import createSetupIntentQuery from "../queries/createSetupIntent";

import Button from "app/core/components/shared/Button";

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

const StripeCard: FunctionComponent<any> = (props) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

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
      },
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
      router.reload();
    }
  };

  return (
    <React.Fragment>
      <PaymentElement id="payment-element" />
      <Button label="save card" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Card
      </Button>
    </React.Fragment>
  );
};

const StripeCardElement = (props) => {
  const [setupIntent, {
    isLoading
  }] = useQuery(createSetupIntentQuery, {})

  if (isLoading) return null

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret: setupIntent.client_secret,
    appearance,
  };

  return (
    <React.Fragment>
      {setupIntent.client_secret && (
        <Elements options={options} stripe={promise}>
          <StripeCard />
        </Elements>
      )}
    </React.Fragment>
  );
};

export default StripeCardElement;

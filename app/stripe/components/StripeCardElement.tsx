import { useRouter } from "next/router";
import React, { useState, FunctionComponent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { trpc } from "server/utils/trpc";

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

    const returnUrl = props.chefId ? `${process.env.NEXT_PUBLIC_URL}/chefs/${props.chefId}/checkout`
    : `${process.env.NEXT_PUBLIC_URL}/account`

    const { error }: any = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: returnUrl,
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
interface StripeCardElementType {
  chefId?: string
}

const StripeCardElement = (props: StripeCardElementType) => {
  const { data, isLoading } = trpc.stripe.createSetupIntent.useQuery()

  if (isLoading) return null

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret: data,
    appearance,
  };

  return (
    <React.Fragment>
      {data && (
        <Elements options={options} stripe={promise}>
          <StripeCard chefId={props.chefId} />
        </Elements>
      )}
    </React.Fragment>
  );
};

export default StripeCardElement;

"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { Button } from "app/components/ui/button";

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

interface StripeElementProps {
  closeAddPaymentForm: () => void;
}
export function StripeElement(props: StripeElementProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_URL}/account`;

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
      throw new Error(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      router.refresh();
    }
  };

  return (
    <>
      <PaymentElement id="payment-element" />
      <div className="mt-4">
        <Button onClick={handleSubmit}>Save card</Button>
        <Button
          className="ml-2"
          variant="ghost"
          onClick={props.closeAddPaymentForm}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

interface AddPaymentFormProps {
  clientSecret: string;
  closeAddPaymentForm: () => void;
}
export default function AddPaymentForm(props: AddPaymentFormProps) {
  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      accessibleColorOnColorPrimary: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options: any = {
    clientSecret: props.clientSecret,
    appearance,
  };

  return (
    <Elements options={options} stripe={promise}>
      <StripeElement closeAddPaymentForm={props.closeAddPaymentForm} />
    </Elements>
  );
}

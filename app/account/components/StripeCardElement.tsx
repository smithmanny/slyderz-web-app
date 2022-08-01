import React, { useEffect, useState, FunctionComponent } from 'react';
import { getAntiCSRFToken, useRouter } from "blitz";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

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

interface DataType {
  clientSecret: string
  id: Number
  paymentMethods: Array<any>
}

const StripeCard: FunctionComponent<any> = (props) => {
  const router = useRouter()
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
      redirect: 'if_required',
      confirmParams: {
        return_url: 'http://localhost:3000/account',
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

  const destroyPaymentMethodMutation = async(paymentMethodId: number) => {
    let data
    try {
      const res = await fetch("http://localhost:3000/api/stripe/destroy-payment-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ paymentMethodId })
      });
      data = await res.json()

    } catch (err) {
      console.log(err)
    }

    if (data) {
      router.reload()
    }
  }

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
              variant="text"
              onClick={async () => await destroyPaymentMethodMutation(stripePaymentMethod.id)}
            >
              Delete
            </Button>
          </StripePaymentSpan>
        </Box>
        ))
    ) : (
      <React.Fragment>
        <PaymentElement id="payment-element" />
        <Button type="submit" sx={{ mt: 2 }} onClick={handleSubmit}>
          Save Card
        </Button>
      </React.Fragment>
    )
  )
}

const StripeCardElement = (props) => {
  const antiCSRFToken = getAntiCSRFToken();
  const [clientSecret, setClientSecret] = useState('');
  const [stripePaymentMethods, setStripePaymentMethods]: any = useState([]);

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createStripeSetupIntent() {
      let data: DataType | null = null;

      try {
        const res = await fetch("/api/stripe/create-setup-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "anti-csrf": antiCSRFToken,
          },
        });
        data = await res.json();
      } catch (err) {
        console.error(err)
      } finally {
        if (data) {
          setClientSecret(data.clientSecret);
          setStripePaymentMethods(data.paymentMethods);
        }
      }
    }

    createStripeSetupIntent();
  }, []);

  return (
    <React.Fragment>
      {clientSecret && (
        <Elements options={options} stripe={promise}>
          <StripeCard paymentMethods={stripePaymentMethods} />
        </Elements>
      )}
    </React.Fragment>
  )
}

export default StripeCardElement;
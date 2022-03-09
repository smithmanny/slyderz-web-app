import { useEffect } from 'react'
import { useRouterQuery, useSession, useRouter } from "blitz"
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Avatar from "app/core/components/shared/Avatar"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Menu from "app/chefs/components/menu"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

export const ConfirmationPage = (props) => {
  const stripe = useStripe();
  const query = useRouterQuery();
  const session = useSession();
  const router = useRouter();
  console.log(query)

  useEffect(() => {
    async function getPaymentIntent() {
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // if (!clientSecret) {
    //   router.push("/")
    //   return;
    // }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
      console.log(paymentIntent)
    }

    getPaymentIntent()

    // stripe
    //   .retrieveSetupIntent(clientSecret || '')
    //   .then(({setupIntent}) => {
    //     // Inspect the SetupIntent `status` to indicate the status of the payment
    //     // to your customer.
    //     //
    //     // Some payment methods will [immediately succeed or fail][0] upon
    //     // confirmation, while others will first enter a `processing` state.
    //     //
    //     // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    //     switch (setupIntent.status) {
    //       case 'succeeded':
    //         console.log('Success! Your payment method has been saved.');
    //         break;

    //       case 'processing':
    //         console.log("Processing payment details. We'll update you when processing is complete.");
    //         break;

    //       case 'requires_payment_method':
    //         // Redirect your user back to your payment page to attempt collecting
    //         // payment again
    //         console.log('Failed to process payment details. Please try another payment method.');
    //         break;
    //     }
    //   });
  }, [stripe]);

  return (
    <ConsumerContainer>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
          textTransform: 'capitalize'
        }}
      >
        Thanks for your order
      </Typography>
      <Typography variant="h6" gutterBottom><b>Order Details:</b> 1</Typography>
      <Typography variant="h6" gutterBottom><b>Order Number:</b> 1</Typography>
      <Typography variant="h6" gutterBottom><b>Order Location:</b> 4288 Leola Road, Douglasville, GA, 30135</Typography>
      <Typography variant="h6" gutterBottom><b>Order Time:</b> 6:00 PM</Typography>

      <Typography variant="h6">Order Summary:</Typography>
    </ConsumerContainer>
  );
};

ConfirmationPage.getLayout = (page) => (
  <Elements stripe={promise}>
    <Layout title="Order Reserved">{page}</Layout>
  </Elements>
)

export default ConfirmationPage;

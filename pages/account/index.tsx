import { gSSP } from "app/blitz-server";
import { useMutation } from "@blitzjs/rpc";
import { BlitzPage } from "@blitzjs/next";
import React from 'react'
import Stripe from 'stripe'

import loginMutation from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import Layout from "app/core/layouts/Layout"
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form"
import StripeCardElement from 'app/account/components/StripeCardElement'

export const getServerSideProps = gSSP(async function getServerSideProps({ ctx }) {
  const session = ctx?.session
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-08-01" });

  if (!session.userId || !session.stripeCustomerId) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: 'card',
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.stripeCustomerId,
    payment_method_types: ['card'],
    metadata: {
      userId: session.userId,
    }
  });

  return {
    props: {
      setupIntent,
      paymentMethods: paymentMethods.data
    },
  }
});

const Account: BlitzPage<any> = (props) => {
  const [login] = useMutation(loginMutation)
  const user = useCurrentUser();
  const clientSecret = props.setupIntent.client_secret

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  };

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   // Retrieve the "setup_intent_client_secret" query parameter appended to
  //   // your return_url by Stripe.js
  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     'setup_intent_client_secret'
  //   );

  //   if (!clientSecret) {
  //     return
  //   }
  //   // Retrieve the SetupIntent
  //   stripe
  //     .retrieveSetupIntent(clientSecret)
  //     .then(({ setupIntent }) => {
  //       // Inspect the SetupIntent `status` to indicate the status of the payment
  //       // to your customer.
  //       //
  //       // Some payment methods will [immediately succeed or fail][0] upon
  //       // confirmation, while others will first enter a `processing` state.
  //       //
  //       // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
  //       switch (setupIntent?.status) {
  //         case 'succeeded':
  //           console.log('Success! Your payment method has been saved.');
  //           break;

  //         case 'processing':
  //           console.log("Processing payment details. We'll update you when processing is complete.");
  //           break;

  //         case 'requires_payment_method':
  //           // Redirect your user back to your payment page to attempt collecting
  //           // payment again
  //           console.log('Failed to process payment details. Please try another payment method.');
  //           break;
  //       }
  //     });
  // }, [stripe]);

  return (
    <React.Fragment>
      <ConsumerContainer maxWidth="sm">
        <Typography variant="h2" align="center">
          Your Account
        </Typography>
        <Form
          submitText="Update Password"
          schema={Login}
          initialValues={initialValues}
          mutation={{
            schema: login,
            toVariables: values => ({
              ...values
            })
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 6 }}>
              <strong>Update Password</strong>
            </Typography>
          </Grid>
            <TextField
              name="password"
              label="Current Password"
              placeholder="Current Password"
            />
            <TextField
              name="newPassword1"
              label="New Password"
              placeholder="New Password"
            />
            <TextField
              name="newPassword2"
              label="Confirm New Password"
              placeholder="Confirm New Password"
            />
        </Form>

        {/* Update Account */}
        <Form
          schema={Login}
          initialValues={initialValues}
          mutation={{
            schema: login,
            toVariables: values => ({
              ...values
            })
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
              <strong>Personal Info</strong>
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <TextField
              disabled
              name="firstName"
              label="First Name"
              placeholder="First Name"
              md={6}
            />
            <TextField
              disabled
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              md={6}
            />
          </Grid>
        </Form>

        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Payment Methods</strong>
        </Typography>
        <StripeCardElement
          clientSecret={clientSecret}
          paymentMethods={props.paymentMethods}
        />

        {/* Delete Account */}
        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Delete Your Account</strong>
        </Typography>
        <Button
          variant="text"
        >
          Delete Account
        </Button>
      </ConsumerContainer>
    </React.Fragment>
  )
}

Account.authenticate = { redirectTo: '/' }
Account.getLayout = (page) => <Layout>{page}</Layout>

export default Account;

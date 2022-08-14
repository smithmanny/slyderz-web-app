import React from 'react';
import { BlitzPage, Routes, getSession } from "blitz";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import Stripe from 'stripe'

import { CartItem } from 'types'
import { formatNumberToCurrency } from "app/helpers"

import Layout from "app/core/layouts/Layout";
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer';
import CheckoutPage from 'app/chefs/components/checkout/CheckoutPage'

interface CheckoutTypes {
  cartItems: Array<CartItem>
  paymentMethods: any
  setupIntent: any
  orderTotal: Number
  setupIntentId: Number
  userId: Number
}

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
const stripeSecret = process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY || ''

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const stripe = new Stripe(stripeSecret);
  const searchParams = req.url.split('?')[1]

  if (!session.userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (!session.cart?.total || !session.cart?.pendingCartItems || !session.stripeCustomerId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const eventDate = new URLSearchParams(searchParams).get(
    "eventDate"
  );
  const eventTime = new URLSearchParams(searchParams).get(
    "eventTime"
  );

  // Create a PaymentIntent with the order amount and currency
  const total = formatNumberToCurrency(session.cart.total).replace("$", "").replace('US', '')
  // Stripe amount must be in cents
  const stripeAmount = Number((parseFloat(total) * 100).toString());

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: 'card',
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.$publicData.stripeCustomerId,
    payment_method_types: ['card'],
    metadata: {
      cartItems: JSON.stringify(session.cart.pendingCartItems),
      eventDate,
      eventTime,
      orderTotal: session.cart.total,
      stripeCustomerId: session.stripeCustomerId,
      stripeAmount,
      userId: session.userId,
    }
  });

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount,
  //   capture_method: 'manual',
  //   currency: "usd",
  //   customer: session.$publicData.stripeCustomerId,
  //   payment_method_types: ['card'],
    // metadata: {
    //   cartItems: JSON.stringify(session.cart.pendingCartItems),
    //   orderTotal: session.cart.total,
    //   userId: session.userId,
    // }
  // });

  return {
    props: {
      cartItems: session.cart.pendingCartItems,
      orderTotal: session.cart.total,
      userId: session.userId,
      // paymentIntent,
      setupIntent,
      paymentMethods
    },
  }
}

const Checkout: BlitzPage = (props: any) => {
  const { cartItems, orderTotal, setupIntent, paymentMethods, userId }: CheckoutTypes = props;
  const clientSecret = setupIntent.client_secret

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };
  return (
    <ConsumerContainer>
      {clientSecret && (
        <Elements options={options} stripe={promise}>
          <CheckoutPage
            setupIntent={setupIntent}
            stripePaymentMethods={paymentMethods.data}
            cartItems={cartItems}
            orderTotal={orderTotal}
            userId={userId}
          />
        </Elements>
      )}
    </ConsumerContainer>
  )
}

Checkout.authenticate = { redirectTo: Routes.LoginPage() }
Checkout.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

export default Checkout;
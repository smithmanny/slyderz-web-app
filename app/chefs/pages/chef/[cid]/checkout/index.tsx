import React from 'react';
import { BlitzPage, Routes, getSession } from "blitz";
import Stripe from 'stripe'

import Layout from "app/core/layouts/Layout";
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer';
import CheckoutPage from 'app/chefs/components/checkout/CheckoutPage'

interface CheckoutTypes {
  eventDate: Date
  eventTime: Date
  paymentMethods: any
  paymentIntent: any
  setupIntentId: Number
  userId: Number
}

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

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: 'card',
  });

  return {
    props: {
      eventDate,
      eventTime,
      userId: session.userId,
      paymentMethods
    },
  }
}

const Checkout: BlitzPage = (props: any) => {
  const { eventDate, eventTime, paymentMethods, userId }: CheckoutTypes = props;
  return (
    <ConsumerContainer>
      <CheckoutPage
        eventDate={eventDate}
        eventTime={eventTime}
        stripePaymentMethods={paymentMethods.data}
        userId={userId}
      />
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
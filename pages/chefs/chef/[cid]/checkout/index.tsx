import { gSSP } from "app/blitz-server";
import { getSession } from "@blitzjs/auth";
import { BlitzPage, Routes } from "@blitzjs/next";
import React from 'react';
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

export const getServerSideProps = gSSP(async function getServerSideProps({ req, res, query }) {
  const session = await getSession(req, res)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-08-01" });

  if (!query.eventDate || !query.eventTime || !session.userId) {
    return {
      redirect: {
        destination: '/',
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

  const eventDate = query.eventDate;
  const eventTime = query.eventTime;

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
});

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
import React from "react";
import { gSSP } from "app/blitz-server";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useRouter } from "next/router";


import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import CheckoutPage from "app/chefs/components/checkout/CheckoutPage";
import { getStripeServer } from "app/utils/getStripe";

interface CheckoutTypes {
  cid: string
  eventDate: Date;
  eventTime: Date;
  paymentMethods: any;
  paymentIntent: any;
  setupIntentId: Number;
  userId: Number;
}

export const getServerSideProps = gSSP(async function getServerSideProps({
  ctx,
  query,
}) {
  const session = ctx?.session;
  const stripe = getStripeServer();
  const { cid } = query

  if (!query.eventDate || !query.eventTime || !session.userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (
    !session.cart?.total ||
    !session.cart?.pendingCartItems ||
    !session.stripeCustomerId
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const eventDate = query.eventDate;
  const eventTime = query.eventTime;

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  return {
    props: {
      cid,
      eventDate,
      eventTime,
      userId: session.userId,
      paymentMethods,
    },
  };
});

const Checkout: BlitzPage = (props: any) => {
  const { cid, eventDate, eventTime, paymentMethods, userId }: CheckoutTypes = props;

  return (
    <ConsumerContainer>
      <CheckoutPage
        eventDate={eventDate}
        eventTime={eventTime}
        stripePaymentMethods={paymentMethods.data}
        userId={userId}
        chefId={cid}
      />
    </ConsumerContainer>
  );
};

Checkout.authenticate = { redirectTo: Routes.LoginPage() };
Checkout.getLayout = (page) => <Layout>{page}</Layout>;

export default Checkout;

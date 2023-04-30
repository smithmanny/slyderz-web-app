import React from "react";
import { gSSP } from "app/blitz-server";
import { BlitzPage } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import CheckoutPage from "app/chefs/components/checkout/CheckoutPage";
import { getStripeServer } from "app/utils/getStripe";
import CartEmpty from "app/checkout/components/CartEmpty";

interface CheckoutTypes {
  cart: any
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
  const eventDate = session.cart?.eventDate
  const eventTime = session.cart?.eventTime

  if (
    !session.stripeCustomerId ||
    !session.userId
  ) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  return {
    props: {
      cart: session.cart,
      cid,
      eventDate,
      eventTime,
      userId: session.userId,
      paymentMethods,
    },
  };
});

const Checkout: BlitzPage = (props: any) => {
  const { cart, cid, eventDate, eventTime, paymentMethods, userId }: CheckoutTypes = props;
  const isCartEmpty = !cart?.pendingCartItems || !cart?.total

  return (
    <ConsumerContainer>
      {isCartEmpty ? (
        <CartEmpty />
      ) : (
        <CheckoutPage
          eventDate={eventDate}
          eventTime={eventTime}
          stripePaymentMethods={paymentMethods.data}
          userId={userId}
          chefId={cid}
        />
      )}
    </ConsumerContainer>
  );
};

Checkout.getLayout = (page) => <Layout>{page}</Layout>;

export default Checkout;

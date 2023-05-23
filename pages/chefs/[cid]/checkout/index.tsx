import React, { useCallback, useState } from "react";
import { BlitzPage } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import CheckoutPage from "app/chefs/components/checkout/CheckoutPage";
import CartEmpty from "app/checkout/components/CartEmpty";
import AddAddressModal from "app/core/modals/AddAddressModal";

interface CheckoutTypes {
  cart: any;
  cid: string;
  eventDate: Date;
  eventTime: string;
  paymentIntent: any;
  setupIntentId: Number;
  userId: Number;
}

export const getServerSideProps = async function getServerSideProps({
  ctx,
  query,
}) {
  const session = ctx?.session;
  const { cid } = query;
  const eventDate = session.cart?.eventDate;
  const eventTime = session.cart?.eventTime;

  if (!session.stripeCustomerId || !session.userId) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cart: session.cart,
      cid,
      eventDate,
      eventTime,
      userId: session.userId,
    },
  };
};

const Checkout: BlitzPage = (props: any) => {
  const { cart, cid, eventDate, eventTime, userId }: CheckoutTypes = props;
  const isCartEmpty = !cart?.pendingCartItems || !cart?.total;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const closeAddressModal = useCallback(() => setShowAddressModal(false), []);
  const openAddressModal = useCallback(() => setShowAddressModal(true), []);

  return (
    <ConsumerContainer>
      {isCartEmpty ? (
        <CartEmpty />
      ) : (
        <React.Fragment>
          <CheckoutPage
            eventDate={eventDate}
            eventTime={eventTime}
            userId={userId}
            chefId={cid}
            openAddressModal={openAddressModal}
          />
          <AddAddressModal
            show={showAddressModal}
            onClose={closeAddressModal}
            title="Add Address"
          />
        </React.Fragment>
      )}
    </ConsumerContainer>
  );
};

Checkout.getLayout = (page) => <Layout>{page}</Layout>;

export default Checkout;

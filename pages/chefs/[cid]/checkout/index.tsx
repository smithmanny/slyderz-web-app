import React, { useCallback, useState } from "react";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import CheckoutPage from "app/chefs/components/checkout/CheckoutPage";
import CartEmpty from "app/checkout/components/CartEmpty";
import AddAddressModal from "app/core/modals/AddAddressModal";

import { getCookieServer } from "server/utils/cookieHelpers";
import { auth } from "integrations/auth/lucia";
import { Cart } from "types";

interface CheckoutTypes {
  cart: Cart;
  cid: string;
  eventDate: Date;
  eventTime: string;
  paymentIntent: any;
  setupIntentId: number;
  userId: number;
}

export const getServerSideProps = async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const { session } = await authRequest.validateUser();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { cid } = ctx.query;
  const cart = getCookieServer("cart", { req: ctx.req, res: ctx.res });

  return {
    props: {
      cart,
      cid,
      userId: session.userId,
    },
  };
};

const Checkout = (props: CheckoutTypes) => {
  const { cart, cid, userId } = props;
  const isCartEmpty = cart.items.length === 0 || cart.total === 0;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const closeAddressModal = useCallback(() => setShowAddressModal(false), []);
  const openAddressModal = useCallback(() => setShowAddressModal(true), []);

  return (
    <ConsumerContainer>
      {isCartEmpty || !cart.eventTime || !cart.eventDate ? (
        <CartEmpty />
      ) : (
        <React.Fragment>
          <CheckoutPage
            eventDate={cart.eventDate}
            eventTime={cart.eventTime}
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

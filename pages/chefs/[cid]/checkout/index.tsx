import React, { useCallback, useState } from "react";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import CheckoutPage from "app/chefs/components/checkout/CheckoutPage";
import CartEmpty from "app/checkout/components/CartEmpty";
import AddAddressModal from "app/core/modals/AddAddressModal";

import { getCookieServer } from "server/utils/cookieHelpers";
import { auth } from "integrations/auth/lucia";
import { Cart } from "types";
import createContext from "server/utils/createContext";
import { appRouter } from "server/routers/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";

interface CheckoutTypes {
  cart: Cart;
  cid: string;
  // eventDate: Date;
  // eventTime: string;
  // paymentIntent: any;
  user: any;
}

export const getServerSideProps = async function getServerSideProps(ctx) {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { cid } = ctx.query;
  if (!cid) throw new Error("Chef not found!");

  const cart = getCookieServer("cart", { req: ctx.req, res: ctx.res });
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
  });

  const user = await helpers.user.fetchUserData.fetch();

  return {
    props: {
      cart,
      cid,
      user,
      trpcState: helpers.dehydrate(),
    },
  };
};

const Checkout = (props: CheckoutTypes) => {
  const { cart, cid, user } = props;
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
            user={user}
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

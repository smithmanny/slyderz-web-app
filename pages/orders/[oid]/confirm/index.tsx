import { useRouter } from "next/router";

import db from "db";
import { readableDate } from "app/utils/dateHelpers";
import {
  TRANSACTIONAL_EMAILS,
  CHEF_SERVICE_FEE,
  CONSUMER_SERVICE_FEE,
} from "types";
import sendSesEmail from "emails/utils/sendSesEmail";

import Box from "app/core/components/shared/Box";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Button from "app/core/components/shared/Button";
import Typography from "app/core/components/shared/Typography";
import Layout from "app/core/layouts/Layout";
import OrderItems from "app/orders/components/OrderItems";
import Divider from "app/core/components/shared/Divider";
import { getStripeServer } from "app/utils/getStripe";

const stripe = getStripeServer();
export const getServerSideProps = async function getServerSideProps({
  req,
  res,
  params,
}) {
  const confirmationNumber = String(params?.oid);

  if (!confirmationNumber) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const order = await db.order.findUniqueOrThrow({
    where: {
      confirmationNumber,
    },
    select: {
      amount: true,
      confirmationNumber: true,
      address1: true,
      address2: true,
      state: true,
      city: true,
      zipcode: true,
      eventDate: true,
      eventTime: true,
      id: true,
      orderStatus: true,
      paymentMethodId: true,
      items: {
        include: {
          dish: {
            select: {
              description: true,
              name: true,
              price: true,
              image: true
            },
          },
        },
      },
      chef: {
        select: {
          id: true,
          stripeAccountId: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          stripeCustomerId: true,
          name: true,
        },
      },
    },
  });

  // Don't charge card again if order is already accepted
  if (order.orderStatus !== "PENDING") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Stripe amount must be in cents
  const consumerServiceFee = order.amount * CONSUMER_SERVICE_FEE;
  const stripeOrderAmount = Number(
    (parseFloat(String(order.amount + consumerServiceFee)) * 100).toString()
  );
  const stripeApplicationFee = Number(
    (
      parseFloat(
        String(
          order.amount * CHEF_SERVICE_FEE + order.amount * CONSUMER_SERVICE_FEE
        )
      ) * 100
    ).toString()
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: stripeOrderAmount,
    capture_method: "manual",
    currency: "usd",
    customer: order.user.stripeCustomerId,
    payment_method: order.paymentMethodId,
    off_session: true,
    confirm: true,
    application_fee_amount: stripeApplicationFee,
    transfer_data: {
      destination: order.chef.stripeAccountId,
    },
    metadata: {
      userId: order.user.id,
    },
  });

  if (!paymentIntent) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await stripe.paymentIntents.capture(paymentIntent.id);

  await db.order.update({
    where: {
      confirmationNumber,
    },
    data: {
      orderStatus: "ACCEPTED",
    },
  });

  const eventDate = new Date(order.eventDate);
  const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`;

  await sendSesEmail({
    to: "contact@slyderz.co",
    type: TRANSACTIONAL_EMAILS.confirmOrder,
    variables: {
      orderNumber: order.confirmationNumber,
      orderDate: readableDate(eventDate),
      orderTime: order.eventTime,
      orderLocation: address,
      orderSubtotal: order.amount,
      orderServiceFee: consumerServiceFee,
      orderTotal: order.amount + consumerServiceFee,
      orderItems: order.items.map(d => ({
        id: d.id,
        quantity: d.quantity,
        description: d.dish.description,
        name: d.dish.name,
        image: d.dish?.image[0]?.imageUrl
      })),
    },
  });

  return {
    props: {
      order: JSON.stringify(order),
    },
  };
};

export const ConfirmOrderPage = (props) => {
  const order = JSON.parse(props.order);
  const router = useRouter();
  return (
    <ConsumerContainer maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">The order has been approved.</Typography>
        <Divider
          sx={{
            marginBottom: 2,
          }}
        />
        {/* <Image src={completedOrderIcon} height={250} width={250} /> */}

        <OrderItems order={order} />

        <Button
          label="go-back-home"
          onClick={() => router.replace("/")}
          sx={{
            p: 2,
            maxWidth: 400,
            width: "100%",
            mt: 4,
          }}
        >
          Go back home
        </Button>
      </Box>
    </ConsumerContainer>
  );
};

ConfirmOrderPage.getLayout = (page) => (
  <Layout title="Order has been reserved">{page}</Layout>
);

export default ConfirmOrderPage;

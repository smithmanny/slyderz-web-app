import { Router } from "blitz"
import Stripe from 'stripe'
import db from 'db'

import { formatNumberToCurrency } from "app/helpers"

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"
import OrderItems from 'app/orders/components/OrderItems'
import Divider from 'app/core/components/shared/Divider'

const STRIPE_SECRET = process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY || ''

export async function getServerSideProps({ req, res }) {
  const stripe = new Stripe(STRIPE_SECRET, { apiVersion: "2020-08-27" });
  const searchParams = req.url.split('?')[1]
  const confirmationNumber = new URLSearchParams(searchParams).get(
    'confirmationNumber'
  );

  if (!confirmationNumber) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const order = await db.order.findFirstOrThrow({
    where: {
      confirmationNumber
    },
    select: {
      amount: true,
      confirmationNumber: true,
      eventDate: true,
      eventTime: true,
      id: true,
      orderStatus: true,
      paymentMethodId: true,
      dishes: {
        include: {
          dish: true,
        },
      },
      chef: {
        select: {
          id: true,
          user: {
            select: {
              firstName: true
            }
          }
        },
      },
      user: {
        select: {
          id: true,
          stripeCustomerId: true
        }
      }
    }
  })

  // Don't charge card again if order is already accepted
  if (order.orderStatus === 'COMPLETED') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const total = formatNumberToCurrency(order.amount).replace("$", "").replace('US', '')
  // Stripe amount must be in cents
  const stripeAmount = Number((parseFloat(total) * 100).toString());

  const paymentIntent = await stripe.paymentIntents.create({
    amount: stripeAmount,
    capture_method: 'manual',
    currency: "usd",
    customer: order.user.stripeCustomerId,
    payment_method: order.paymentMethodId,
    off_session: true,
    confirm: true,
    metadata: {
      cartItems: JSON.stringify(order.dishes),
      userId: order.user.id,
    }
  });

  if (!paymentIntent) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  await stripe.paymentIntents.capture(paymentIntent.id)

  await db.order.update({
    where: {
      confirmationNumber,
    },
    data: {
      orderStatus: 'ACCEPTED'
    }
  })

  return {
    props: {
      order,
    },
  }
}

export const ConfirmOrderPage = (props) => {
  const { order } = props;
  return (
    <ConsumerContainer maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">
          Your order has been approved. The card used to place this order will be chared in the amount of ${order.amount}
        </Typography>
        <Divider sx={{
          marginBottom: 2,
        }} />
        {/* <Image src={completedOrderIcon} height={250} width={250} /> */}

        <OrderItems
          order={order}
        />

        <Button
          onClick={() => Router.replace('/')}
          sx={{
            p: 2,
            maxWidth: 400,
            width: '100%',
            mt: 2,
          }}
        >
          Go back home
        </Button>
      </Box>
    </ConsumerContainer>
  );
};

ConfirmOrderPage.getLayout = (page) => (
  <Layout title="Order Reserved">{page}</Layout>
)

export default ConfirmOrderPage;

import { gSSP } from "app/blitz-server";
import { useRouter } from "next/router";
import db from 'db'

import { readableDate } from "app/utils/dateHelpers"
import { TRANSACTIONAL_EMAILS } from "types"
import sendSesEmail from "emails/utils/sendSesEmail";

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"
import OrderItems from 'app/orders/components/OrderItems'
import Divider from 'app/core/components/shared/Divider'
import { getStripeServer } from "app/utils/getStripe";

export const getServerSideProps = gSSP(async function getServerSideProps({ req, res, params }) {
  const stripe = getStripeServer()
  const confirmationNumber = String(params?.oid)

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
          dish: {
            select: {
              description: true,
              name: true,
            }
          }
        }
      },
      chef: {
        select: {
          user: {
            select: {
              email: true
            }
          },
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          stripeCustomerId: true,
          firstName: true
        }
      }
    }
  })

  // Don't charge card again if order is already accepted
  if (order.orderStatus !== 'PENDING') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  // Stripe amount must be in cents
  const stripeAmount = Number((parseFloat(String(order.amount)) * 100).toString());

  const paymentIntent = await stripe.paymentIntents.create({
    amount: stripeAmount,
    capture_method: 'manual',
    currency: "usd",
    customer: order.user.stripeCustomerId,
    payment_method: order.paymentMethodId,
    off_session: true,
    confirm: true,
    metadata: {
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

  const eventDate = new Date(order.eventDate)

  await sendSesEmail({
    to: 'contact@slyderz.co',
    type: TRANSACTIONAL_EMAILS.confirmOrder,
    variables: {
      order: {
        orderNumber: order.confirmationNumber,
        date: readableDate(eventDate),
        time: order.eventTime,
        location: "",
        subtotal: order.amount,
        serviceFee: 3,
        total: order.amount + 3,
        items: order.dishes.map(d => ({
          id: String(d.id),
          quantity: d.quantity,
          description: d.dish.description,
          name: d.dish.name,
        }))
      }
    }
  })

  return {
    props: {
      order,
    },
  }
});

export const ConfirmOrderPage = (props) => {
  const { order } = props;
  const router = useRouter()
  return (
    <ConsumerContainer maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">
          The order has been approved.
        </Typography>
        <Divider sx={{
          marginBottom: 2,
        }} />
        {/* <Image src={completedOrderIcon} height={250} width={250} /> */}

        <OrderItems
          order={order}
        />

        <Button
          label="go-back-home"
          onClick={() => router.replace('/')}
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
  <Layout title="Order has been reserved">{page}</Layout>
)

export default ConfirmOrderPage;

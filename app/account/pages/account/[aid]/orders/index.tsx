import { useEffect } from 'react'
import { Image, getSession, useRouter, useMutation, useQuery, Router } from "blitz"
import Stripe from 'stripe'

import orderConfirmationQuery from "../../queries/getOrderByConfirmation";
import resetCartItemsMutation from "app/account/mutations/resetCartItemsMutation";
import completedOrderIcon from "public/completed-order.svg"

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

const stripeSecret = process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY || ''

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const stripe = new Stripe(stripeSecret, {});
  const searchParams = req.url.split('?')[1]

  // if (!session.userId) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

  const clientSecret = new URLSearchParams(searchParams).get(
    'setup_intent_client_secret'
  );

  console.log('clientSecret', clientSecret)

  // const setupIntent = await stripe.setupIntents.retrieve()

  // const createOrderBody = {
  //   setupIntent,
  //   paymentMethod,
  //   orderTotal,
  //   userId
  // }
  // let order

  // try {
  //   const res = await fetch("http://localhost:3000/api/create-order", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "anti-csrf": antiCSRFToken,
  //     },
  //     body: JSON.stringify(createOrderBody)
  //   });

  //   order = await res.json()

  // } catch (err) {
  //   console.error(err)
  //   throw new Error('Failed creating order')
  // }

  // if (order) {
  //   const date = new Date(eventDate)
  //   const acceptUrl = new URL(`http://localhost:3000/orders/confirm/${paymentIntent.id}`)
  //   acceptUrl.searchParams.set('confirmationNumber', order.pendingOrder.confirmationNumber)
  //   const denyUrl = new URL(`http://localhost:3000/orders/deny/${paymentIntent.id}`)
  //   acceptUrl.searchParams.set('confirmationNumber', order.pendingOrder.confirmationNumber)

  //   const emailData: EmailBodyType = {
  //     acceptOrderUrl: acceptUrl,
  //     denyOrderUrl: denyUrl,
  //     cartItems,
  //     orderTotal,
  //     confirmationNumber: order.pendingOrder.confirmationNumber,
  //     eventTime,
  //     eventDate: readableDate(date),
  //   }
  //   sendOrderRequestEmail(emailData)
  //   setEmailSent(true)
  //   confirmationNumberRef.current = order.pendingOrder.confirmationNumber
  // }

  // // Check for confirmation searchParamas
  // if (req.url.includes('?')) {
  //   const searchParamas = req.url.split('?')[1]
  //   const [key, confirmationNumber] = searchParamas.split('=')

  //   if (key !== 'confirmationNumber') {
  //     return {
  //       redirect: {
  //         destination: '/',
  //         permanent: false
  //       }
  //     };
  //   }

  //   return {
  //     props: {
  //       confirmationNumber,
  //       userId: session.userId
  //     },
  //   }
  // } else {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   };
  // }
  return {
    props: {

    }
  }
}

export const ConfirmationPage = (props) => {
  const router = useRouter()
  const [resetCartItems] = useMutation(resetCartItemsMutation);
  // const [order] = useQuery(orderConfirmationQuery, { confirmationNumber: props.confirmationNumber });

  // useEffect(() => {
  //   if (!props.userId || !props.confirmationNumber) {
  //     router.push("/")
  //     return;
  //   }

  //   Router.prefetch('/')

  //   resetCartItems()
  // }, []);

  return (
    <ConsumerContainer maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            textAlign: 'center',
            textTransform: 'capitalize'
          }}
        >
          Thank you for your order!
        </Typography>
        <Image src={completedOrderIcon} height={250} width={250} />

        <Typography variant="h5" align="center">
          Your order has been requested. We'll notify you when the chef has confirmed your order.
        </Typography>
        <Typography variant="caption" align="center">
          •We'll place a hold on your card until the chef confirms your order.
        </Typography>

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

ConfirmationPage.getLayout = (page) => (
  <Layout title="Order Reserved">{page}</Layout>
)

export default ConfirmationPage;

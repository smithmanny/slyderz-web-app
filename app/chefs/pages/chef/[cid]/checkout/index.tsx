import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getAntiCSRFToken, BlitzPage, Link, Routes, getSession, useRouter, Router } from "blitz";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import ArrowBack from '@mui/icons-material/ArrowBack';

import { styled } from "integrations/material-ui";
import { readableDate } from "app/helpers/dateHelpers"
import { sendOrderRequestEmail } from "app/helpers"
import { CartItem, EmailBodyType } from 'types'

import Form, { Select } from 'app/core/components/form';
import Alert from 'app/core/components/shared/Alert';
import Button from "app/core/components/shared/Button"
import Layout from "app/core/layouts/Layout";
import CartSummary from 'app/core/components/cart/cartSummary'
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer';
import Grid from 'app/core/components/shared/Grid';
import Typography from 'app/core/components/shared/Typography'

const Section = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const Spinner = styled('div')({
  "&:before": {
    width: "10.4px",
    height: "20.4px",
    background: "#5469d4",
    borderRadius: "20.4px 0 0 20.4px",
    top: "-0.2px",
    left: "-0.2px",
    WebkitTransformOrigin: "10.4px 10.2px",
    transformOrigin: "10.4px 10.2px",
    WebkitAnimation: "loading 2s infinite ease 1.5s",
    animation: "loading 2s infinite ease 1.5s"
  },
  "&:after": {
    width: "10.4px",
    height: "10.2px",
    background: "#5469d4",
    borderRadius: "0 10.2px 10.2px 0",
    top: "-0.1px",
    left: "10.2px",
    WebkitTransformOrigin: "0px 10.2px",
    transformOrigin: "0px 10.2px",
    WebkitAnimation: "loading 2s infinite ease",
    animation: "loading 2s infinite ease"
  },
  "&:before &:after": {
    borderRadius: "50%",
    position: "absolute",
    content: '""'
  },
  color: "#ffffff",
  fontSize: "22px",
  textIndent: "-99999px",
  margin: "0px auto",
  position: "relative",
  width: "20px",
  height: "20px",
  boxShadow: "inset 0 0 0 2px",
  WebkitTransform: "translateZ(0)",
  msTransform: "translateZ(0)",
  transform: "translateZ(0)",
  "@keyframes loading": {
    "0%": { WebkitTransform: "rotate(0deg)", transform: "rotate(0deg)" },
    "100%": { WebkitTransform: "rotate(360deg)", transform: "rotate(360deg)" }
  },
});

interface DataType {
  paymentIntent: any
  paymentMethods: Array<any>
}
interface CheckoutPageTypes {
  paymentIntent: any
  stripePaymentMethods: Array<any>
  cartItems: Array<any>
  eventDate: string
  eventTime: string
  orderTotal: Number
  userId: Number
  router: any
}
interface CheckoutTypes {
  cartItems: Array<CartItem>
  orderTotal: Number
  setupIntentId: Number
  userId: Number
}

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

const CheckoutPage = ({ cartItems, eventDate, eventTime, orderTotal, userId, router, paymentIntent, stripePaymentMethods }: CheckoutPageTypes) => {
  const antiCSRFToken = getAntiCSRFToken();
  const stripe = useStripe();
  const elements = useElements();
  const confirmationNumberRef: any = useRef()
  const [error, setError]: any | String = useState(null);
  const [emailSent, setEmailSent]: any | boolean = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (emailSent && confirmationNumberRef.current) {
      const url = new URL('http://localhost:3000/account/order')
      url.searchParams.set('confirmationNumber', confirmationNumberRef.current)
      router.push(`${url.pathname}${url.search}`)
    }
  }, [emailSent])

  const handleSubmit = async (values) => {
    if (!stripe || !elements || !paymentIntent) {
      return
    };

    setProcessing(true);

    const createOrderBody = {
      orderTotal,
      userId
    }
    let order

    try {
      const res = await fetch("http://localhost:3000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify(createOrderBody)
      });

      order = await res.json()

    } catch (err) {
      console.error(err)
      throw new Error('Failed creating order')
    }

    const date = new Date(eventDate)
    const acceptUrl = new URL(`http://localhost:3000/orders/confirm/${paymentIntent.id}`)
    acceptUrl.searchParams.set('confirmationNumber', order.pendingOrder.confirmationNumber)
    const denyUrl = new URL(`http://localhost:3000/orders/deny/${paymentIntent.id}`)
    acceptUrl.searchParams.set('confirmationNumber', order.pendingOrder.confirmationNumber)

    const emailData: EmailBodyType = {
      acceptOrderUrl: acceptUrl,
      denyOrderUrl: denyUrl,
      cartItems,
      orderTotal,
      confirmationNumber: order.pendingOrder.confirmationNumber,
      eventTime: eventTime,
      eventDate: readableDate(date),
    }
    sendOrderRequestEmail(emailData)
    setEmailSent(true)
    confirmationNumberRef.current = order.pendingOrder.confirmationNumber
  };

  const renderLeftContainer = () => (
    <React.Fragment>
      <Section>
        <Link href="/chef/1">
          <Button
            component="a"
            type="icon"
            sx={{
              padding: 0,
              mr: 1,
            }}
          >
            <ArrowBack />
          </Button>
        </Link>
      </Section>
      <Form
        initialValues={{
          eventDate: new Date(eventDate),
          eventTime: eventTime,
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mb: 2 }} variant="h5">Payment Info</Typography>
            {stripePaymentMethods.length > 0 && (
              <Select
                label="Select payment method"
                name="paymentMethod"
                items={stripePaymentMethods.map(paymentMethod => ({
                  key: paymentMethod.card.last4,
                  value: paymentMethod.id
                }))}
                variant="outlined"
                md={12}
                required
              />
            )}
            {stripePaymentMethods.length === 0 && (
              <Button
                variant="text"
                onClick={e => {
                  e.preventDefault()

                  router.push(Routes.Account())

                  // openStripeCardModal()
                }}
              >
                Add Payment Method
              </Button>
            )}
            <Button
              disabled={processing}
              type="submit"
              sx={{
                background: "#5469d4",
                fontFamily: "Arial, sans-serif",
                color: "#ffffff",
                borderRadius: "0 0 4px 4px",
                border: "0",
                padding: "12px 16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
                mt: 2,
                width: "100%",
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "default",
                },
              }}
            >
              <span>
                {processing ? (
                  <Spinner id="spinner"></Spinner>
                ) : (
                  "Pay now"
                )}
              </span>
            </Button>
            {/* Show any error that happens when processing the payment */}
            {error && (
              <Alert onClose={() => setError(null)} />
            )}
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>
  )
  return (
    <Grid container spacing={4}>
      {/* Left side */}
      <Grid item xs={12} md={6}>
        {renderLeftContainer()}
      </Grid>
      <Grid item xs={12} md={6}>
        <CartSummary checkoutPage />
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (!session.cart?.total || !session.cart?.pendingCartItems) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      cartItems: session.cart.pendingCartItems,
      orderTotal: session.cart.total,
      userId: session.userId,
    },
  }
}

const Checkout: BlitzPage = (props: any) => {
  const router = useRouter();
  const antiCSRFToken = getAntiCSRFToken();
  const paymentIntent:any = useRef();
  const stripePaymentMethods:any = useRef();
  const [clientSecret, setClientSecret] = useState('');
  const { cartItems, orderTotal, userId }: CheckoutTypes = props;
  const eventDate = new URLSearchParams(window.location.search).get(
    "eventDate"
  );
  const eventTime = new URLSearchParams(window.location.search).get(
    "eventTime"
  );

  useEffect(() => {
    const body = {
      cartItems,
      orderTotal,
      userId,
    }

    // Redirect if no eventTime or eventDate
    if (!eventDate || !eventTime) {
      router.push('/')
    }

    // Create PaymentIntent as soon as the page loads
    async function createStripePaymentIntent() {
      let data: DataType | null = null;

      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "anti-csrf": antiCSRFToken,
          },
          body: JSON.stringify(body)
        });
        data = await res.json();
      } catch (err) {
        console.error(err)
      } finally {
        if (data) {
          setClientSecret(data.paymentIntent.client_secret);
          paymentIntent.current = data.paymentIntent
          stripePaymentMethods.current = data.paymentMethods
        }
      }
    }

    createStripePaymentIntent();
  }, [cartItems, orderTotal, userId, eventDate, eventTime]);

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };
  return (
    <ConsumerContainer>
      {clientSecret && (eventTime && eventDate) && (
        <Elements options={options} stripe={promise}>
          <CheckoutPage
            paymentIntent={paymentIntent.current}
            stripePaymentMethods={stripePaymentMethods.current.data}
            cartItems={cartItems}
            eventDate={eventDate}
            eventTime={eventTime}
            orderTotal={orderTotal}
            userId={userId}
            router={router}
          />
        </Elements>
      )}
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
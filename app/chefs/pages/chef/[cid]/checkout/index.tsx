import React, { useEffect, useState } from 'react';
import { BlitzPage, Link, getSession, Router, Routes, useMutation } from "blitz";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { readableDate, transfromDateToReadableTime } from "app/helpers/dateHelpers"
import { makeStyles } from "integrations/material-ui";

import createConfirmationNumber from "app/confirmation/mutations/createOrderConfirmationNumber";
import resetCartItemsMutation from "app/confirmation/mutations/resetCartItemsMutation";

import Form, { DatePicker, Select } from 'app/core/components/form';
import Button from "app/core/components/shared/Button"
import Paper from "app/core/components/shared/Paper"
import Layout from "app/core/layouts/Layout";
import CartSummary from 'app/core/components/cart/cartSummary'
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer';
import Grid from 'app/core/components/shared/Grid';
import Typography from 'app/core/components/shared/Typography'

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");
const checkoutFormStyles = makeStyles((theme) => ({
  arrowBackButton: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  checkoutHeader: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    marginBottom: theme.spacing(2),
  },
  // Stripe checkout form section
  "&input": {
    borderRadius: "6px",
    marginBottom: "6px",
    padding: "12px",
    border: "1px solid rgba(50, 50, 93, 0.1)",
    maxHeight: "44px",
    fontSize: "16px",
    width: "100%",
    background: "white",
    boxSizing: "border-box"
  },
  cardError: {
    color: "rgb(105, 115, 134)",
    fontSize: "16px",
    lineHeight: "20px",
    marginTop: "12px",
    textAlign: "center"
  },
  cardElement: {
    borderRadius: "4px 4px 0 0",
    padding: "12px",
    border: "1px solid rgba(50, 50, 93, 0.1)",
    maxHeight: "44px",
    width: "100%",
    background: "white",
    boxSizing: "border-box"
  },
  paymentRequestButton: {
    marginBottom: "32px"
  },
  submit: {
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
    width: "100%",
    "&:disabled": {
      opacity: 0.5,
      cursor: "default",
    },
  },
  spinner: {
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
    transform: "translateZ(0)"
  },
  "@keyframes loading": {
    "0%": { WebkitTransform: "rotate(0deg)", transform: "rotate(0deg)" },
    "100%": { WebkitTransform: "rotate(360deg)", transform: "rotate(360deg)" }
  },
}
));

interface DataType {
  clientSecret: string
}

interface EmailBodyType {
  confirmationNumber: string
  eventDate: string
  eventTime: string
}

const Checkout: BlitzPage | any = ({ cartItems, ...props }) => {
  const classes = checkoutFormStyles();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError]: any | String = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [resetCartItems] = useMutation(resetCartItemsMutation);
  const [createConfirmationNumberMutation] = useMutation(createConfirmationNumber, {
    onSuccess: resetCartItems,
    onError: () => {
      setSucceeded(false)
    }
  })
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  function sendOrderRequestEmail(emailData: EmailBodyType) {
    const orderRequestData = {
      to: 'shakhorsmith@gmail.com',
      templateData: {
        eventDate: emailData.eventDate,
        eventTime: emailData.eventTime,
        location: '4288 Leola Rd, Douglasville, Ga, 30135',
        orderNumber: emailData.confirmationNumber,
      }
    };
    return fetch("/api/mailers/send-order-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderRequestData)
    });
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createStripePaymentIntent() {
      let data: DataType | null = null;

      try {
        const res = await fetch("/api/stripe-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ items: cartItems })
        });
        data = await res.json();
      } catch (err) {
        console.error(err)
      } finally {
        if (data) {
          setClientSecret(data.clientSecret);
        }
      }
    }

    createStripePaymentIntent();
  }, [cartItems]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (values) => {
    const { eventDate } = values

    if (!stripe || !elements) {
      return
    };

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        type: 'card',
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      try {
        const confirmationNumber = await createConfirmationNumberMutation();
        const emailData: EmailBodyType = {
          ...values,
          confirmationNumber,
          eventDate: readableDate(eventDate),
        }
        // Send confirmation email
        if (confirmationNumber) {
          sendOrderRequestEmail(emailData)
          .then(() => Router.replace(`/confirmation/${confirmationNumber}`))
        }
      } catch (err) {
        console.error(err)
      }
    }
  };
  const timesMockup = [
    {
      key: transfromDateToReadableTime(new Date()),
      value: transfromDateToReadableTime(new Date())
    },
    {
      key: transfromDateToReadableTime(new Date(22)),
      value: transfromDateToReadableTime(new Date(22))
    },
  ]

  const renderLeftContainer = () => (
    <React.Fragment>
      <section className={classes.checkoutHeader}>
        <Link href="/chef/1">
          <Button
            component="a"
            type="icon"
            className={classes.arrowBackButton}
          >
            <ArrowBack />
          </Button>
        </Link>
      </section>
      <Form
        initialValues={{
          eventDate: new Date(),
          eventTime: transfromDateToReadableTime(new Date()),
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.sectionHeader} variant="h5">Your reservation</Typography>
            <Typography variant="subtitle1">Date</Typography>
            <DatePicker
              name="eventDate"
              disablePast
              required
              views={['date', 'month']}
              inputVariant="outlined"
            />

            <Typography variant="subtitle1">Time</Typography>
            <Select
              name="eventTime"
              items={timesMockup}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.sectionHeader} variant="h5">Payment Info</Typography>
              <CardElement className={classes.cardElement} options={cardStyle} onChange={handleChange} />
              <Button
                disabled={processing || disabled || succeeded}
                className={classes.submit}
              >
                <span>
                  {processing ? (
                    <div className={classes.spinner} id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </Button>
              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className={classes.cardError} role="alert">
                  {error}
                </div>
              )}
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <ConsumerContainer>
        <Grid container spacing={4}>
          {/* Left side */}
          <Grid item xs={12} md={6}>
            {renderLeftContainer()}
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <CartSummary />
            </Paper>
          </Grid>
        </Grid>
      </ConsumerContainer>
    </React.Fragment>
  )
}

Checkout.authenticate = { redirectTo: Routes.LoginPage() }
Checkout.getLayout = (page) => (
  <Elements stripe={promise}>
    <Layout>
      {page}
    </Layout>
  </Elements>
)

export default Checkout;
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import { Routes } from "@blitzjs/next";
import React, { useState } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';

import { styled } from "integrations/material-ui";
import CreateOrderMutation from 'app/checkout/mutations/createOrderMutation'

import Form, { Select } from 'app/core/components/form';
import Alert from 'app/core/components/shared/Alert';
import Button from "app/core/components/shared/Button"
import CartSummary from 'app/core/components/cart/cartSummary'
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

interface CheckoutPageTypes {
  eventDate: Date
  eventTime: Date
  stripePaymentMethods: Array<any>
  userId: Number
}

const CheckoutPage = ({ eventDate, eventTime, stripePaymentMethods }: CheckoutPageTypes) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [createOrder] = useMutation(CreateOrderMutation)

  const handleSubmit = async (values) => {
    const orderBody = {
      eventDate,
      eventTime,
      paymentMethodId: values.paymentMethod
    }

    setProcessing(true);
    const fufilledOrder = await createOrder(orderBody)

    if (fufilledOrder && fufilledOrder.confirmationNumber) {
      return router.push(Routes.NewOrderConfirmationPage({
        oid: fufilledOrder.confirmationNumber
      }))
    }
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
        onSubmit={handleSubmit}
        initialValues={{
          paymentMethod: stripePaymentMethods[0]?.id
        }}
      >
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

                return router.push(Routes.Account())
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
          {/* {error && (
            <Alert onClose={() => setError(null)} />
          )} */}
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

export default CheckoutPage;
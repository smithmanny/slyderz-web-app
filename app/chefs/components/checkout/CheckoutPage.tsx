import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { useAppSelector } from "integrations/redux";
import { styled } from "integrations/material-ui";
import { trpc } from "server/utils/trpc";
import type { AddAddressType } from "integrations/redux/reducers/userReduer";

import Form, { Select } from "app/core/components/form";
import Button from "app/core/components/shared/Button";
import Box from "app/core/components/shared/Box";
import CheckoutCartSummary from "app/core/components/cart/cartSummary/CheckoutCartSummary";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import StripeCardElement from "app/stripe/components/StripeCardElement";

const Spinner = styled("div")({
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
    animation: "loading 2s infinite ease 1.5s",
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
    animation: "loading 2s infinite ease",
  },
  "&:before &:after": {
    borderRadius: "50%",
    position: "absolute",
    content: '""',
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
    "100%": { WebkitTransform: "rotate(360deg)", transform: "rotate(360deg)" },
  },
});

interface CheckoutPageTypes {
  chefId: string;
  eventDate: Date;
  eventTime: string;
  userId: number;
  openAddressModal: () => void;
}

const CheckoutPage = ({
  chefId,
  eventDate,
  eventTime,
  openAddressModal,
}: CheckoutPageTypes) => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const createOrder = trpc.checkout.createCheckout.useMutation();
  const stripePaymentMethods = useAppSelector(
    (state) => state.user.stripeCards,
  );
  const address = useAppSelector((state) => state.user.address);
  const isAddressEmpty = Object.keys(address).length === 0;

  const handleSubmit = async (values) => {
    const location: AddAddressType = values.selectedAddress;
    const orderBody = {
      address: {
        address1: location.address1,
        address2: location.address2,
        state: location.state,
        city: location.city,
        zipcode: location.zipcode,
      },
      eventDate: new Date(eventDate),
      eventTime,
      paymentMethodId: values?.paymentMethod,
    };

    if (!values.paymentMethod) throw new Error("Select payment method");

    setProcessing(true);
    try {
      const confirmationNumber = await createOrder.mutateAsync(orderBody);

      if (confirmationNumber) {
        return router.push(`/orders/${confirmationNumber}/new`);
      }
    } catch (err) {
      console.log("Cart failed", err);
      setProcessing(false);
    }
  };

  const renderLeftContainer = () => (
    <React.Fragment>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          marginBottom: 2,
        }}
      >
        <Link href={`/chefs/${chefId}`}>
          <Button
            label="go-back"
            buttonType="icon"
            sx={{
              padding: 0,
              mr: 1,
            }}
            type="button"
          >
            <ArrowBack />
          </Button>
        </Link>
      </Box>
      <Form
        id="slyderz-checkout-form"
        onSubmit={handleSubmit}
        initialValues={{
          paymentMethod: stripePaymentMethods[0]?.id,
          selectedAddress: address,
        }}
      >
        <Grid item xs={12}>
          {!isAddressEmpty ? (
            <>
              <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
                Location Info
              </Typography>
              <Select
                label="Select event address"
                name="selectedAddress"
                items={[address].map((addy) => ({
                  label: addy.address1,
                  value: addy,
                }))}
                variant="outlined"
                md={12}
                required
              />
            </>
          ) : (
            <>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Address
              </Typography>

              <Button
                label="Add address"
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAddressModal();
                }}
              >
                Add Address
              </Button>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Payment Info
          </Typography>
        </Grid>
        {stripePaymentMethods.length > 0 && (
          <Select
            label="Select payment method"
            name="paymentMethod"
            items={stripePaymentMethods.map((paymentMethod) => ({
              label: paymentMethod.card.last4,
              value: paymentMethod.id,
            }))}
            variant="outlined"
            md={12}
            required
          />
        )}
        {stripePaymentMethods.length === 0 && (
          <StripeCardElement chefId={chefId} />
        )}

        {/* Show any error that happens when processing the payment */}
        {/* {error && (
            <Alert onClose={() => setError(null)} />
          )} */}
      </Form>
    </React.Fragment>
  );

  return (
    <Grid container spacing={4}>
      {/* Left side */}
      <Grid item xs={12} md={6}>
        {renderLeftContainer()}
      </Grid>
      <Grid item xs={12} md={6}>
        <CheckoutCartSummary />
        <Button
          disabled={processing || !stripePaymentMethods[0]?.id}
          label="pay-now"
          type="submit"
          form="slyderz-checkout-form"
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
            {processing ? <Spinner id="spinner"></Spinner> : "Pay now"}
          </span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(CheckoutPage);

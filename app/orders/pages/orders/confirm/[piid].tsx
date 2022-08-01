import { useEffect } from 'react'
import { Image, getAntiCSRFToken, useRouter, Router, useParam } from "blitz"

import resetCartItemsMutation from "app/account/mutations/resetCartItemsMutation";
import completedOrderIcon from "public/completed-order.svg"

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

// Chef clicks approve order
// 1. Take paymentIntentId and call stripe api
// 2. Update order status from pending to approved

export const ConfirmOrderPage = (props) => {
  const antiCSRFToken = getAntiCSRFToken();
  const router = useRouter()
  const confirmationNumber = useParam("confirmationNumber", "string")
  const { piid } = router.query;

  useEffect(() => {
    const capturePaymentIntent = async () => {
      const body = {
        paymentIntentId: piid,
        confirmationNumber
      }
      try {
        const res = await fetch("/api/stripe/capture-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "anti-csrf": antiCSRFToken,
          },
          body: JSON.stringify(body),
        });
        await res.json();

      } catch (err) {
        console.error(err)
      }
    }

    capturePaymentIntent()
  }, []);

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

ConfirmOrderPage.getLayout = (page) => (
  <Layout title="Order Reserved">{page}</Layout>
)

export default ConfirmOrderPage;

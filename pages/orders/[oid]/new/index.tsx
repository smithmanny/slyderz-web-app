/* eslint-disable @typescript-eslint/no-floating-promises */
import { gSSP } from "app/blitz-server";
import Image from "next/image";
import { useRouter } from "next/router";

import completedOrderIcon from "public/completed-order.svg"

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

export const getServerSideProps = gSSP(async function getServerSideProps({ ctx, params }) {
  const session = ctx?.session

  if (!params?.oid) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  if (!session.userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const confirmationNumber = params.oid

  if (!confirmationNumber) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      confirmationNumber,
      userId: session.userId
    }
  }
});

export const NewOrderConfirmationPage = (props) => {
  const router = useRouter()

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
        <Image src={completedOrderIcon} height={250} width={250} alt="New Order" />

        <Typography variant="h5" align="center">
          Your order has been requested.We&apos;ll notify you when the chef has confirmed your order.
        </Typography>
        <Typography variant="caption" align="center">
          •Your card will not be charged until the chef confirms your order.
        </Typography>

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

NewOrderConfirmationPage.getLayout = (page) => (
  <Layout title="Order Reserved">{page}</Layout>
)

export default NewOrderConfirmationPage;

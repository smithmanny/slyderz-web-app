import { useEffect } from 'react'
import { Image, getSession, useRouter, useMutation, Router } from "blitz"

import resetCartItemsMutation from "app/account/mutations/resetCartItemsMutation";
import completedOrderIcon from "public/completed-order.svg"

import Box from "app/core/components/shared/Box"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const searchParams = req.url.split('?')[1]

  if (!session.userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const confirmationNumber = new URLSearchParams(searchParams).get(
    'confirmationNumber'
  );

  if (!confirmationNumber) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // TODO: Redirect if confirmation status is not 'PENDING'

  return {
    props: {
      confirmationNumber,
      userId: session.userId
    }
  }
}

export const ConfirmationPage = (props) => {
  const router = useRouter()
  const [resetCartItems] = useMutation(resetCartItemsMutation);

  useEffect(() => {
    if (!props.userId || !props.confirmationNumber) {
      router.push("/")
      return;
    }

    Router.prefetch('/')

    resetCartItems()
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
          •Your card will not be charged until the chef confirms your order.
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

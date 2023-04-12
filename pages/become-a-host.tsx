import { BlitzPage } from "@blitzjs/next";
import { gSSP } from "app/blitz-server";

import db from "db"
import Layout from "app/core/layouts/Layout"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import { getStripeServer } from "app/utils/getStripe";

export const getServerSideProps = gSSP(async function getServerSideProps({ ctx }) {
  const session = ctx?.session
  const stripe = getStripeServer()

  if (!session.userId) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const user = await db.user.findFirstOrThrow({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      chef: {
        select: {
          id: true,
          stripeAccountId: true
        }
      }
    }
  })

  let stripeAccountUrl: string = ''

  if (user.chef?.stripeAccountId) {
    const account = await stripe.accounts.retrieve(user.chef.stripeAccountId)

    // User can receive payments
    if (account.charges_enabled) {
      await db.chef.update({
        where: { id: user.chef.id },
        data: {
          isOnboardingComplete: true
        }
      })

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const accountLink = await stripe.accountLinks.create({
      account: user.chef.stripeAccountId,
      refresh_url: 'http://localhost:3000/api/stripe/reauth',
      return_url: 'http://localhost:3000/become-a-host',
      type: 'account_onboarding'
    })

    stripeAccountUrl = accountLink.url
  } else {
    // Create a stripe account and save id to chef
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: user.email,
      default_currency: 'USD'
    })

    await db.chef.create({
      data: {
        stripeAccountId: account.id,
        userId: user.id
      }
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/api/stripe/reauth',
      return_url: 'http://localhost:3000/become-a-host',
      type: 'account_onboarding'
    })

    stripeAccountUrl = accountLink.url
  }

  return {
    redirect: {
      destination: stripeAccountUrl,
      permanent: false
    }
  }
});

const BecomeAHost: BlitzPage = (props) => {
  return (
    <ConsumerContainer>
    </ConsumerContainer>
  )
}

export default BecomeAHost
BecomeAHost.getLayout = (page) => <Layout title="Become a host">{page}</Layout>

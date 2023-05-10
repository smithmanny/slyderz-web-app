import { BlitzPage } from "@blitzjs/next";
import { gSSP } from "app/blitz-server";

import db from "db";
import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Typography from "app/core/components/shared/Typography";
import { getStripeServer } from "app/utils/getStripe";
import ChefOnboarded from "app/becomeAHost/components/ChefOnboarded";

const stripe = getStripeServer();

export const getServerSideProps = gSSP(async function getServerSideProps({
  ctx,
}) {
  const session = ctx?.session;

  if (!session.userId) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const user = await db.user.findFirstOrThrow({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      chef: {
        select: {
          id: true,
          stripeAccountId: true,
        },
      },
    },
  });

  let stripeAccountUrl: string = "";
  let isStripeOnboardingComplete: boolean = false;

  if (user.chef?.stripeAccountId) {
    const account = await stripe.accounts.retrieve(user.chef.stripeAccountId);

    // Stripe onboarding is complete and user can receive payments
    if (account.charges_enabled) {
      isStripeOnboardingComplete = true;

      await db.chef.update({
        where: { id: user.chef.id },
        data: {
          isOnboardingComplete: true,
        },
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: user.chef.stripeAccountId,
      refresh_url: "http://localhost:3000/api/stripe/reauth",
      return_url: "http://localhost:3000/become-a-host",
      type: "account_onboarding",
    });

    stripeAccountUrl = accountLink.url;
  } else {
    // Create a stripe account and save id to chef
    const stripeAccount = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      default_currency: "USD",
    });

    const chef = await db.chef.create({
      data: {
        stripeAccountId: stripeAccount.id,
        userId: user.id,
      },
    });

    const createAccountLink = await stripe.accountLinks.create({
      account: stripeAccount.id,
      refresh_url: "http://localhost:3000/api/stripe/reauth",
      return_url: "http://localhost:3000/become-a-host",
      type: "account_onboarding",
    });

    const [_, accountLink] = await Promise.all([chef, createAccountLink]);

    stripeAccountUrl = accountLink.url;
  }

  return {
    props: {
      isStripeOnboardingComplete,
      stripeAccountUrl,
    },
  };
});

interface BecomeAHostPropTypes {
  stripeAccountUrl: string;
  isStripeOnboardingComplete: boolean;
}

const BecomeAHost: BlitzPage = (props: BecomeAHostPropTypes) => {
  return (
    <ConsumerContainer maxWidth="md">
      {props.isStripeOnboardingComplete ? (
        <ChefOnboarded stripeAccountUrl={props.stripeAccountUrl} />
      ) : (
        <Typography>Edit Stripe Account</Typography>
      )}
    </ConsumerContainer>
  );
};

export default BecomeAHost;
BecomeAHost.getLayout = (page) => <Layout title="Become a host">{page}</Layout>;

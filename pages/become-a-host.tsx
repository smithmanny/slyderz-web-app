import { BlitzPage } from "@blitzjs/next";
import { gSSP } from "app/blitz-server";

import db from "db";
import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Typography from "app/core/components/shared/Typography";
import { getStripeServer } from "app/utils/getStripe";

const stripe = getStripeServer();

// export const getServerSideProps = gSSP(async function getServerSideProps({
//   ctx,
// }) {
//   const session = ctx?.session;

//   if (!session.userId) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const user = await db.user.findFirstOrThrow({
//     where: { id: session.userId },
//     select: {
//       id: true,
//       email: true,
//       chef: {
//         select: {
//           id: true,
//           stripeAccountId: true,
//           isOnboardingComplete: true,
//         },
//       },
//     },
//   });

//   // Check if user is chef and navigate to correct route
//   if (user.chef) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   let stripeAccountUrl: string = "";
//   let isStripeOnboardingComplete: boolean = false;

//   if (user.chef?.stripeAccountId) {
//     const account = await stripe.accounts.retrieve(user.chef.stripeAccountId);

//     // Stripe onboarding is complete and user can receive payments
//     if (account.charges_enabled) {
//       isStripeOnboardingComplete = true;

//       await db.chef.update({
//         where: { id: user.chef.id },
//         data: {
//           isOnboardingComplete: true,
//         },
//       });
//     }

//     const accountLink = await stripe.accountLinks.create({
//       account: user.chef.stripeAccountId,
//       refresh_url: "http://localhost:3000/api/stripe/reauth",
//       return_url: "http://localhost:3000/become-a-host",
//       type: "account_onboarding",
//     });

//     stripeAccountUrl = accountLink.url;
//   }

//   return {
//     props: {
//       isStripeOnboardingComplete,
//       stripeAccountUrl,
//     },
//   };
// });

const BecomeAHost: BlitzPage = (props) => {
  return (
    <ConsumerContainer maxWidth="md">
      <Typography>Edit Stripe Account</Typography>
    </ConsumerContainer>
  );
};

export default BecomeAHost;
BecomeAHost.getLayout = (page) => <Layout title="Become a host">{page}</Layout>;

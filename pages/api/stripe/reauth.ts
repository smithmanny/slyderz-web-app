import { getStripeServer } from "app/utils/getStripe";
import { NextApiRequest, NextApiResponse } from "next";

import db from "db";

const stripe = getStripeServer();

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;

  const user = await db.authUser.findFirstOrThrow({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      chef: {
        select: {
          stripeAccountId: true
        }
      }
    }
  })

  if (!user.chef) {
    throw new Error("Chef not found")
  }

  // TODO: replace with prod url
  const createAccountLink = await stripe.accountLinks.create({
    account: user.chef.stripeAccountId,
    refresh_url: "http://localhost:3000/api/stripe/reauth",
    return_url: "http://localhost:3000/dashboard/onboarding",
    type: "account_onboarding",
  });

  res.status(200).json({
    url: createAccountLink.url
  })
};

export default handler;

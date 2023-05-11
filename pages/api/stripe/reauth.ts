import { api } from "app/blitz-server";
import { getStripeServer } from "app/utils/getStripe";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizationError } from "blitz";

import db from "db";

const stripe = getStripeServer();

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;

  const user = await db.user.findFirstOrThrow({
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
    throw new AuthorizationError("Chef not found")
  }

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

export default api(handler);

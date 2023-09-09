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
          stripeAccountId: true,
        },
      },
    },
  });

  if (!user.chef) {
    throw new Error("Chef not found");
  }

  const createAccountLink = await stripe.accountLinks.create({
    account: user.chef.stripeAccountId,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/onboarding`,
    type: "account_onboarding",
  });

  res.status(200).json({
    url: createAccountLink.url,
  });
};

export default handler;

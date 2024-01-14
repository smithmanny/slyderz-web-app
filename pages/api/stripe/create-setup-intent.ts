import { getStripeServer } from "app/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = getStripeServer();

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;

  if (session.user.stripeCustomerId === undefined) {
    throw new Error("No customer was provided");
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.user.stripeCustomerId,
    type: "card",
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.user.stripeCustomerId,
    payment_method_types: ["card"],
  });

  res.status(200).json({
    clientSecret: setupIntent.client_secret,
    id: setupIntent.id,
    paymentMethods: paymentMethods.data,
  });
};

export default handler;

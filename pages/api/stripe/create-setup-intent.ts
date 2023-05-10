import { api } from "app/blitz-server";
import { getStripeServer } from "app/utils/getStripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = getStripeServer();

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;

  if (session.stripeCustomerId === undefined) {
    throw Error("No customer was provided");
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.stripeCustomerId,
    payment_method_types: ["card"],
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      clientSecret: setupIntent.client_secret,
      id: setupIntent.id,
      paymentMethods: paymentMethods.data,
    })
  );
};

export default api(handler);

import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@blitzjs/auth";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)

  if (session.stripeCustomerId === undefined) {
    throw Error("No customer was provided")
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: 'card',
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.stripeCustomerId,
    payment_method_types: ['card'],
  });

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({
    clientSecret: setupIntent.client_secret,
    id: setupIntent.id,
    paymentMethods: paymentMethods.data
  }))
}

export default api(handler);
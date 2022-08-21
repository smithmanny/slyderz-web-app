import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@blitzjs/auth";
import Stripe from 'stripe'

import { STRIPE_SECRET } from "app/helpers/site";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  const stripe = new Stripe(STRIPE_SECRET, { apiVersion: "2022-08-01" });

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
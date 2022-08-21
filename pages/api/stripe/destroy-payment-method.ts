import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-08-01" });
  const { paymentMethodId } = req.body

  if (paymentMethodId === undefined) {
    throw Error("No payment intent was provided")
  }

  const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ deletedPaymentMethod: paymentMethod }))
}

export default api(handler);
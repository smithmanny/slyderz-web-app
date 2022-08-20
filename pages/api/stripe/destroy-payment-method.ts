import { api } from "app/blitz-server";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
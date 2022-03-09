import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import { formatNumberToCurrency } from "app/helpers"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const items = req.body.items;
  const session = await getSession(req, res)

  if (items?.length === 0 || session.$publicData.cart === undefined) {
    throw Error("Can't have an empty cart")
  }

  const total = formatNumberToCurrency(session.$publicData.cart.total).replace("$", "")
  // Stripe amount must be in cents
  const amount = Number((parseFloat(total) * 100).toString());

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }))
}
export default handler
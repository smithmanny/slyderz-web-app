import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import { formatNumberToCurrency } from "app/helpers"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const { cartItems, orderTotal, eventDate, eventTime, userId } = req.body

  if (session.$publicData.cart === undefined) {
    throw Error("Can't have an empty cart")
  }

  const total = formatNumberToCurrency(session.$publicData.cart.total).replace("$", "").replace('US', '')
  // Stripe amount must be in cents
  const amount = Number((parseFloat(total) * 100).toString());

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.$publicData.stripeCustomerId,
    type: 'card',
  });

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    capture_method: 'manual',
    currency: "usd",
    customer: session.$publicData.stripeCustomerId,
    payment_method_types: ['card'],
    metadata: {
      cartItems: JSON.stringify(cartItems),
      orderTotal,
      eventDate,
      eventTime,
      userId,
    }
  });

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    paymentMethods
  }))
}
export default handler
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import { formatNumberToCurrency } from "app/helpers"
import db from 'db'

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (!session.cart) {
    throw new Error("Cart can't be empty")
  }

  if (session.stripeCustomerId === undefined) {
    throw Error("No customer was provided")
  }

  const total = formatNumberToCurrency(session.cart.total).replace("$", "").replace('US', '')
  // Stripe amount must be in cents
  const stripeAmount = Number((parseFloat(total) * 100).toString());

  // Capture user payment
  const paymentIntent = await stripe.paymentIntents.create({
    amount: stripeAmount,
    capture_method: 'manual',
    currency: "usd",
    customer: session.$publicData.stripeCustomerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
    metadata: {
      cartItems: JSON.stringify(session.cart.pendingCartItems),
      eventDate,
      eventTime,
      orderTotal: session.cart.total,
      stripeCustomerId: session.stripeCustomerId,
      stripeAmount,
      userId: session.userId,
    }
  });

  await db.order.update({
    where: {
      confirmationNumber,
    },
    data: {
      orderStatus: 'ACCEPTED'
    }
  })

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ paymentIntent }))
}

export default handler
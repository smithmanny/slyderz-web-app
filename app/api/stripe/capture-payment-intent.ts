import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from 'db'

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { confirmationNumber, paymentIntentId } = req.body

  if (paymentIntentId === undefined) {
    throw Error("No payment intent was provided")
  }

  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

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
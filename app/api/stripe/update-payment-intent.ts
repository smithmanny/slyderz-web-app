import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { eventDate, eventTime, paymentMethod, paymentIntentId } = req.body

  if (paymentIntentId === undefined) {
    throw Error("No payment intent was provided")
  }

  const paymentIntent = await stripe.paymentIntents.update(
    paymentIntentId,
    {
      payment_method: paymentMethod,
      metadata:{
        eventDate,
        eventTime,
      }
    }
  );

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ paymentIntentMetadata: paymentIntent.metadata }))
}

export default handler
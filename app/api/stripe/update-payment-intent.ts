import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { cartItems, orderTotal, eventDate, eventTime, setupIntentId, userId } = req.body

  if (setupIntentId === undefined) {
    throw Error("No setup intent was provided")
  }

  const setupIntent = await stripe.setupIntents.update(
    setupIntentId,
    {
      metadata:{
        cartItems: JSON.stringify(cartItems),
        orderTotal,
        eventDate,
        eventTime,
        userId,
      }
    }
  );

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ id: setupIntent.id }))
}

export default handler
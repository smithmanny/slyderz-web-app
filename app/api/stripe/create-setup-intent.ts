import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  if (session.$publicData.stripeCustomerId === undefined) {
    throw Error("No customer was provided")
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.$publicData.stripeCustomerId,
    type: 'card',
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: session.$publicData.stripeCustomerId,
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

export default handler
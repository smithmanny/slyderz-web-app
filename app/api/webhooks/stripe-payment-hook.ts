import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const endpointSecret = 'whsec_5660a4063705518695c7e719aa5614d3b124c016b5a2105935f6a5dd2cf154a6'
  const sig = req.headers['stripe-signature'];

  let event = req.body

  // if (endpointSecret) {
  //   try {
  //     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  //   }
  //   catch (err) {
  //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //     return res.status(400);
  //   }
  // }

  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      console.log('PaymentIntent was created!');
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.amount_capturable_updated':
      const paymentIntentAmount = event.data.object;
      console.log('PaymentIntent was updated!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end()
}

export default handler
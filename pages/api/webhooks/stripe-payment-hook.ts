// import { NextApiRequest, NextApiResponse } from "next";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
//   const sig = req.headers["stripe-signature"];
//   const event = req.body;

//   // if (endpointSecret) {
//   //   try {
//   //     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   //   }
//   //   catch (err) {
//   //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
//   //     return res.status(400);
//   //   }
//   // }

//   switch (event.type) {
//     case "payment_intent.created":
//       console.log("PaymentIntent was created!");
//       break;
//     case "payment_intent.succeeded":
//       const paymentIntentSucceded = event.data.object;
//       console.log("PaymentIntent was successful!", paymentIntentSucceded);
//       break;
//     case "setup_intent.created":
//       const setupIntentCreated = event.data.object;
//       console.log("SetupIntent was created successfully!", setupIntentCreated);
//       break;
//     case "setup_intent.succeeded":
//       const setupIntentSucceeded = event.data.object;
//       console.log("SetupIntent succeeded!", setupIntentSucceeded);
//       break;
//     case "payment_intent.amount_capturable_updated":
//       const paymentIntentAmount = event.data.object;
//       console.log("PaymentIntent was updated!");
//       break;
//     case "payment_method.attached":
//       const paymentMethod = event.data.object;
//       console.log("PaymentMethod was attached to a Customer!", paymentMethod);
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).end();
// };

// export default handler;

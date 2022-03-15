import { BlitzApiRequest, BlitzApiResponse } from "blitz"

import { readableDate } from "app/helpers/dateHelpers"
import { CartItem } from 'types'

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

interface EmailBodyType {
  cartItems: Array<CartItem>
  confirmationNumber: string
  eventDate: string
  eventTime: string
  orderTotal: string
}

function sendOrderRequestEmail(emailData: EmailBodyType) {
  const orderRequestData = {
    to: 'shakhorsmith@gmail.com',
    templateData: {
      cartItems: emailData.cartItems,
      eventDate: emailData.eventDate,
      eventTime: emailData.eventTime,
      location: '4288 Leola Rd, Douglasville, Ga, 30135',
      orderNumber: emailData.confirmationNumber,
      orderTotal: emailData.orderTotal,
    }
  };
  return fetch("http://localhost:3000/api/mailers/send-order-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}

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
    case 'setup_intent.created':
      const setupIntentCreated = event.data.object;
      console.log('SetupIntent was created successfully!', setupIntentCreated);
      break;
    case 'setup_intent.succeeded':
      const setupIntent = event.data.object;
      const values = setupIntent.metadata

      let data
      const orderRequestData = {
        ...values,
        paymentMethod: setupIntent.payment_method
      }

      try {
        const res = await fetch("http://localhost:3000/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderRequestData)
        });

        data = await res.json()

        } catch (err) {
          console.error(err)
        }

        // Send confirmation email
        if (data) {
          const date = new Date(values.eventDate)
          const emailData: EmailBodyType = {
            cartItems: JSON.parse(values.cartItems),
            orderTotal: values.orderTotal,
            confirmationNumber: data.pendingOrder.confirmationNumber,
            eventTime: values.eventTime,
            eventDate: readableDate(date),
          }
          sendOrderRequestEmail(emailData)
        }
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
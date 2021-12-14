import { getSession, BlitzApiRequest, BlitzApiResponse } from "blitz"
// const stripe = require("stripe")("sk_test_PHGdRXFISHoYwFqSlVPfTEh7");
const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

const handler = async(req: BlitzApiRequest, res: BlitzApiResponse) => {
  const items = req.body.items;
  const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }))
}
export default handler
import { api } from "app/blitz-server";
import { getStripeServer } from "app/utils/getStripe";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;
  const stripe = getStripeServer();

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      paymentMethods: paymentMethods.data,
    })
  );
};

export default api(handler);

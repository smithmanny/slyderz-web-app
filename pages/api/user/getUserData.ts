import { api } from "app/blitz-server";
import { getStripeServer } from "app/utils/getStripe";
import db from "db";

import type { NextApiRequest, NextApiResponse } from "next";

async function getStripePayments(session) {
  const stripe = getStripeServer();

  const paymentMethods = await stripe.paymentMethods.list({
    customer: session.stripeCustomerId,
    type: "card",
  });

  return paymentMethods
}

async function getAddress() {
  const user = await db.user.findFirstOrThrow({
    where: {
      id: 1
    },
    select: {
      address: {
        select: {
          address1: true,
          address2: true,
          city: true,
          state: true,
          zipcode: true,
        }
      }
    }
  })

  return user.address
}

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;
  const stripePayments = getStripePayments(session)
  const [paymentMethods, address] = await Promise.all([stripePayments, getAddress()])

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      address,
      paymentMethods: paymentMethods.data,
    })
  );
};

export default api(handler);

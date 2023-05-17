import { api } from "app/blitz-server";
import { getStripeServer } from "app/utils/getStripe";
import db from "db";

import type { NextApiRequest, NextApiResponse } from "next";

const stripe = getStripeServer();

async function getStripePayments(session) {
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

async function getChefStatus(session) {
  const userId = session.userId;

  const chef = await db.chef.findFirst({
    where: { userId: userId },
    select: {
      stripeAccountId: true,
      isOnboardingComplete: true,
    },
  });

  if (!chef) {
    return { isChef: false, isChefProfileComplete: false }
  }

  if (!!chef.isOnboardingComplete) {
    return { isChef: true, isChefProfileComplete: true }
  } else {
    return { isChef: true, isChefProfileComplete: false }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { session } = ctx;
  const stripePayments = getStripePayments(session)
  const userAddress = getAddress()
  const chefStatus = getChefStatus(session)
  const [paymentMethods, address, checkUserChefStatus] = await Promise.all([
    stripePayments, userAddress, chefStatus
  ])

  res.status(200).json({
    address,
    paymentMethods: paymentMethods.data,
    chefStatus: checkUserChefStatus
  })
};

export default api(handler);

import { Ctx } from "blitz";
import { AuthorizationError } from "blitz";

import { getStripeServer } from "app/utils/getStripe";
import db from "db";

const stripe = getStripeServer();

export default async function becomeAHostMutation(
  input: any,
  ctx: Ctx
) {
  const { session } = ctx;

  if (!session.userId) throw new AuthorizationError('You must be logged in')

  const user = await db.user.findFirstOrThrow({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      chef: {
        select: {
          stripeAccountId: true
        }
      }
    }
  })

  if (user.chef?.stripeAccountId) throw new AuthorizationError('Chef already created for this account')

  // Create a stripe account and save id to chef
    const stripeAccount = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      default_currency: "USD",
    });

    const chef = await db.chef.create({
      data: {
        stripeAccountId: stripeAccount.id,
        userId: user.id,
      },
    });

    const createAccountLink = await stripe.accountLinks.create({
      account: stripeAccount.id,
      refresh_url: "http://localhost:3000/api/stripe/reauth",
      return_url: "http://localhost:3000/dashboard/onboarding",
      type: "account_onboarding",
    });

    try {
      const [_, accountLink] = await Promise.all([chef, createAccountLink]);

      return accountLink.url
    } catch (err) {
      throw new Error(err)
    }
}

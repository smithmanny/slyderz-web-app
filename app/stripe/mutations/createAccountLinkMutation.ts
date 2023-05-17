import { Ctx } from "blitz";
import { AuthorizationError } from "blitz";

import { getStripeServer } from "app/utils/getStripe";
import db from "db";

const stripe = getStripeServer();

export default async function createAccountLinkMutation(
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

  if (!user.chef || !user.chef.stripeAccountId) throw new AuthorizationError()

  try {
    const accountLink = await stripe.accountLinks.create({
      account: user.chef.stripeAccountId,
      refresh_url: "http://localhost:3000/api/stripe/reauth",
      return_url: "http://localhost:3000/dashboard",
      type: "account_onboarding",
    });
    return accountLink.url
  } catch (err) {
    throw new Error(err)
  }
}

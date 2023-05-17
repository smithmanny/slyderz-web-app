import { resolver } from "@blitzjs/rpc";

import db from "db";
import { getStripeServer } from "app/utils/getStripe";

const stripe = getStripeServer()

export default resolver.pipe(resolver.authorize(), async (input, ctx) => {
  const userId = ctx.session.userId;
  const chef = await db.chef.findFirstOrThrow({
    where: {
      userId
    },
    select: {
      id: true,
      stripeAccountId: true,
      onboardingState: true
    }
  })

  if (chef.onboardingState === "SETUP_STRIPE") {
    const account = await stripe.accounts.retrieve(chef.stripeAccountId);

    if (account.charges_enabled) {
      await db.chef.update({
        where: {
          id: chef.id
        },
        data: {
          onboardingState: "UPLOAD_HEADSHOT"
        }
      })
    }
  }

  return chef.onboardingState
});

import { resolver } from "@blitzjs/rpc";
import { getStripeServer } from "app/utils/getStripe";

const stripe = getStripeServer()

export default resolver.pipe(resolver.authorize(), async (input, ctx) => {
  const userId = ctx.session.userId;

  const setupIntent = await stripe.setupIntents.create({
    customer: ctx.session.stripeCustomerId,
    payment_method_types: ["card"],
    metadata: {
      userId,
    },
    usage: "off_session",
  });

  return setupIntent
});

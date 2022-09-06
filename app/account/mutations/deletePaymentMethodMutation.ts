import { resolver } from "@blitzjs/rpc";

import Stripe from "stripe"
import { DeleteStripePaymentMethod } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteStripePaymentMethod),
  resolver.authorize(),
  async (input, ctx) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-08-01" });

    if (input === undefined) {
      throw Error("No payment intent was provided")
    }

    const paymentMethod = await stripe.paymentMethods.detach(input);
    return paymentMethod
  }
)

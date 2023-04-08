import { resolver } from "@blitzjs/rpc";

import { DeleteStripePaymentMethod } from "../validations"
import { getStripeServer } from 'app/utils/getStripe'

export default resolver.pipe(
  resolver.zod(DeleteStripePaymentMethod),
  resolver.authorize(),
  async (input, ctx) => {
    const stripe = getStripeServer()

    if (input === undefined) {
      throw Error("No payment intent was provided")
    }

    const paymentMethod = await stripe.paymentMethods.detach(input);
    return paymentMethod
  }
)

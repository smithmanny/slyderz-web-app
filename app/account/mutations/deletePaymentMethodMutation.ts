import { resolver } from "@blitzjs/rpc";

import { DeleteStripePaymentMethod } from "../validations";
import { getStripeServer } from "app/utils/getStripe";

const stripe = getStripeServer();

export default resolver.pipe(
  resolver.zod(DeleteStripePaymentMethod),
  resolver.authorize(),
  async (input, ctx) => {

    if (input === undefined) {
      throw Error("No payment intent was provided");
    }

    const paymentMethod = await stripe.paymentMethods.detach(input);
    return paymentMethod;
  }
);

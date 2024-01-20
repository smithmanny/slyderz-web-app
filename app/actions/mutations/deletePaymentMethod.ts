"use server"

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { getStripeServer } from "app/lib/stripe";
import { UnknownError } from "app/lib/errors";

const deletePaymentMethodSchema = z.string()
export default async function deletePaymentMethodMutation(stripePaymentId: z.infer<typeof deletePaymentMethodSchema>) {
  const stripe = getStripeServer()

  try {
      await stripe.paymentMethods.detach(
        stripePaymentId
      );

      return revalidatePath('/account')
    } catch (err: any) {
      throw new UnknownError({
        message: "Payment method not deleted",
        cause: err
      });
    }
}
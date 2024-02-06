"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";

const deletePaymentMethodSchema = z.string();
export default async function deletePaymentMethodMutation(
	stripePaymentId: z.infer<typeof deletePaymentMethodSchema>,
) {
	const stripe = getStripeServer();

	try {
		await stripe.paymentMethods.detach(stripePaymentId);

		return revalidatePath("/account");
	} catch (err: any) {
		throw new UnknownError({
			message: "Payment method not deleted",
			cause: err,
		});
	}
}

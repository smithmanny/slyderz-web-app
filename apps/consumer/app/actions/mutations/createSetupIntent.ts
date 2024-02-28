"use server";

import { getProtectedSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";

export default async function createSetupIntentMutation() {
	const session = await getProtectedSession();
	const stripe = getStripeServer();

	try {
		const setupIntent = await stripe.setupIntents.create({
			customer: session.user.stripeCustomerId,
			payment_method_types: ["card"],
			metadata: {
				userId: session.user.id,
			},
			usage: "off_session",
		});

		return setupIntent.client_secret as string;
	} catch (err) {
		console.log(err);
		throw new UnknownError({
			message: "Error..Please try again",
			cause: err,
		});
	}
}

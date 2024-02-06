"use server";

import { getProtectedSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";

export default async function getAccountQuery() {
	const session = await getProtectedSession();
	const stripe = getStripeServer();
	const paymentMethods = await stripe.paymentMethods.list({
		customer: session.user.stripeCustomerId,
		type: "card",
	});

	return {
		paymentMethods: paymentMethods.data,
		user: session.user,
	};
}

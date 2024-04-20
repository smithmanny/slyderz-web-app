"use server";

import { getProtectedSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";
import { db } from "drizzle";

export default async function getAccountQuery() {
	const { user } = await getProtectedSession();
	const stripe = getStripeServer();

	const paymentMethods = await stripe.paymentMethods.list({
		customer: user.stripeCustomerId,
		type: "card",
	});

	const address = await db.query.address.findFirst({
		where: (address, { eq }) => eq(address.userId, user.id)
	})

	return {
		paymentMethods: paymentMethods.data,
		address,
		user,
	};
}

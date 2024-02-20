"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { db } from "drizzle";

import { chefs, users } from "drizzle/schema/user";

export default async function createChefMutation(userId: number) {
	const stripe = getStripeServer();

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, userId),
		columns: {
			id: true,
			email: true,
		},
		with: {
			chef: true
		},
	});

	if (!user) {
		throw new Error("User not found")
	}

	if (user.chef?.stripeAccountId) redirect("/dashboard");

	// Create a stripe account and save id to chef
	const stripeAccount = await stripe.accounts.create({
		type: "express",
		country: "US",
		email: user.email,
		default_currency: "USD",
	});

	const chef = db.insert(chefs).values({
		stripeAccountId: stripeAccount.id,
		userId: user.id
	})

	const createAccountLink = stripe.accountLinks.create({
		account: stripeAccount.id,
		refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
		return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
		type: "account_onboarding",
	});

	// Set user role to chef
	const convertUserToChef = db.update(users).set({
		role: "CHEF"
	})
		.where(eq(users.id, user.id))

	try {
		const [_, accountLink] = await Promise.all([
			chef,
			createAccountLink,
			convertUserToChef,
		]);

		return accountLink.url;
	} catch (err) {
		throw new UnknownError({
			message: "Chef not created",
			cause: err,
		});
	}
}

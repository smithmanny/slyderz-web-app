"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { db } from "drizzle";

import { chefs, users } from "drizzle/schema/user";

export default async function createChefMutation(userId: string) {
	const stripe = getStripeServer();

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, userId),
		columns: {
			id: true,
			email: true,
		},
		with: {
			chef: true,
		},
	});

	if (!user) {
		throw new Error("User not found");
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
		id: generateId(10),
		stripeAccountId: stripeAccount.id,
		userId: user.id,
	});

	// Set user role to chef
	const convertUserToChef = db
		.update(users)
		.set({
			role: "CHEF",
		})
		.where(eq(users.id, user.id));

	await Promise.all([chef, convertUserToChef]).catch((err) => {
		throw new UnknownError({
			message: "Chef not created",
			cause: err,
		});
	});

	redirect("/dashboard");
}

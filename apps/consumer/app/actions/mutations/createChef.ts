"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { db } from "drizzle";

import { calendar } from "drizzle/schema/menu";
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

	await db.transaction(async (tx) => {
		const createChef = tx
			.insert(chefs)
			.values({
				id: generateId(10),
				stripeAccountId: stripeAccount.id,
				userId: user.id,
			})
			.returning({ id: chefs.id });

		// Set user role to chef
		const convertUserToChef = tx
			.update(users)
			.set({
				role: "CHEF",
			})
			.where(eq(users.id, user.id));

		const [chefRes] = await Promise.all([createChef, convertUserToChef]).catch(
			(err) => {
				throw new UnknownError({
					message: "Chef not created",
					cause: err,
				});
			},
		);

		const chef = chefRes[0];

		if (!chef) {
			throw new UnknownError({
				message: "Chef not found",
			});
		}

		await tx.insert(calendar).values({
			id: generateId(10),
			chefId: chef.id,
		});
	});

	redirect("/dashboard");
}

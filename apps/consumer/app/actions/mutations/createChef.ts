"use server";

import { redirect } from "next/navigation";

import { auth } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import prisma from "db";

import { RoleType } from ".prisma/client";

export default async function createChefMutation(userId: string) {
	const stripe = getStripeServer();

	const user = await prisma.authUser.findFirstOrThrow({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			chef: {
				select: {
					stripeAccountId: true,
				},
			},
		},
	});

	if (user.chef?.stripeAccountId) redirect("/dashboard");

	// Create a stripe account and save id to chef
	const stripeAccount = await stripe.accounts.create({
		type: "express",
		country: "US",
		email: user.email,
		default_currency: "USD",
	});

	const chef = prisma.chef.create({
		data: {
			stripeAccountId: stripeAccount.id,
			userId: user.id,
		},
	});

	const createAccountLink = stripe.accountLinks.create({
		account: stripeAccount.id,
		refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
		return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
		type: "account_onboarding",
	});

	// Set user role to chef
	const convertUserToChef = auth.updateUserAttributes(user.id, {
		role: RoleType.CHEF,
	});

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

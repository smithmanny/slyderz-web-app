"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { getProtectedSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import { db } from "drizzle";
import { chefs } from "drizzle/schema/user";

export default async function getOnboardingStateQuery() {
	const { user } = await getProtectedSession();
	const stripe = getStripeServer();

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, user.id),
		columns: {
			id: true,
			stripeAccountId: true,
			onboardingState: true,
			isOnboardingComplete: true,
		},
	});

	if (!chef) {
		redirect("/host");
	}

	if (chef.isOnboardingComplete) redirect("/dashboard");

	if (chef.onboardingState === "setup_stripe") {
		const account = await stripe.accounts.retrieve(chef.stripeAccountId);

		if (account.charges_enabled) {
			const data = await db
				.update(chefs)
				.set({
					onboardingState: "upload_headshot",
				})
				.where(eq(chefs.id, chef.id))
				.returning();

			const updatedChef = data[0];

			if (!updatedChef) {
				throw new NotFoundError({
					message: "Chef not found",
				});
			}

			return {
				onboardingState: updatedChef.onboardingState,
				isOnboardingComplete: updatedChef.isOnboardingComplete,
			};
		}
	}

	return {
		onboardingState: chef.onboardingState,
		isOnboardingComplete: chef.isOnboardingComplete,
	};
}

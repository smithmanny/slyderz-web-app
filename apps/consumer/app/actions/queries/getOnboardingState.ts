"use server";

import { getProtectedSession } from "app/lib/auth";
import { getStripeServer } from "app/lib/stripe";
import prisma from "db";

import { OnboardingState } from ".prisma/client";

export default async function getOnboardingStateQuery() {
	const session = await getProtectedSession();
	const stripe = getStripeServer();
	const chef = await prisma.chef.findFirstOrThrow({
		where: {
			userId: session.user.userId,
		},
		select: {
			id: true,
			stripeAccountId: true,
			onboardingState: true,
			isOnboardingComplete: true,
		},
	});

	if (chef.onboardingState === OnboardingState.SETUP_STRIPE) {
		const account = await stripe.accounts.retrieve(chef.stripeAccountId);

		if (account.charges_enabled) {
			const updatedChef = await prisma.chef.update({
				where: {
					id: chef.id,
				},
				data: {
					onboardingState: "UPLOAD_HEADSHOT",
				},
			});

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

"use server";

import { revalidatePath } from "next/cache";

import { getProtectedSession } from "app/lib/auth";
import prisma from "db";
import { OnboardingState } from ".prisma/client";

export default async function handleHeadshotOnboardingNextStepMutation() {
	const session = await getProtectedSession();
	const chef = await prisma.chef.findFirstOrThrow({
		where: { userId: session.user.userId },
		select: {
			id: true,
			onboardingState: true,
		},
	});

	if (chef.onboardingState !== OnboardingState.UPLOAD_HEADSHOT) {
		throw new Error("Error confirming onboarding step");
	}

	await prisma.chef.update({
		where: { id: chef.id },
		data: {
			onboardingState: OnboardingState.COMPLETE_SERVSAFE,
		},
	});

	revalidatePath("/dashboard");
}

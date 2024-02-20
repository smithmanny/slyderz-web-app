"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getProtectedSession } from "app/lib/auth";
import { db } from "drizzle";
import { chefs } from "drizzle/schema/user";
import { NotFoundError } from "app/lib/errors";

export default async function handleHeadshotOnboardingNextStepMutation() {
	const { user } = await getProtectedSession();

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, user.id),
		columns: {
			id: true,
			onboardingState: true
		}
	});

	if (!chef) {
		throw new NotFoundError({
			message: "Chef not found"
		})
	}

	if (chef.onboardingState !== "UPLOAD_HEADSHOT") {
		throw new Error("Error confirming onboarding step");
	}

	await db
		.update(chefs)
		.set({
			onboardingState: "COMPLETE_SERVSAFE"
		})
		.where(eq(chefs.id, chef.id))

	revalidatePath("/dashboard");
}

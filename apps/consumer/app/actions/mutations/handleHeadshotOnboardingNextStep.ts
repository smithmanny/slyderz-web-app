"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getProtectedSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";
import { db } from "drizzle";
import { chefs } from "drizzle/schema/user";

export default async function handleHeadshotOnboardingNextStepMutation() {
	const { user } = await getProtectedSession();

	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.userId, user.id),
		columns: {
			id: true,
			onboardingState: true,
		},
	});

	if (!chef) {
		throw new NotFoundError({
			message: "Chef not found",
		});
	}

	if (chef.onboardingState !== "upload_headshot") {
		throw new Error("Error confirming onboarding step");
	}

	await db
		.update(chefs)
		.set({
			onboardingState: "complete_servsafe",
		})
		.where(eq(chefs.id, chef.id));

	revalidatePath("/dashboard");
}

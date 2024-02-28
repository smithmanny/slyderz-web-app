"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "drizzle";
import { sections } from "drizzle/schema/menu";

const deleteMenuSectionSchema = z.object({
	sectionId: z.number(),
});
export async function deleteMenuSectionMutation(
	input: z.infer<typeof deleteMenuSectionSchema>,
) {
	const dishesOnSection = await db.query.dishes.findMany({
		where: (dishes, { eq }) => eq(dishes.sectionId, input.sectionId),
	});

	if (dishesOnSection.length > 0) {
		return {
			message: "Delete dishes on section first",
			error: true,
		};
	}

	try {
		await db
			.update(sections)
			.set({
				isActive: false,
			})
			.where(eq(sections.id, input.sectionId));
	} catch (err) {
		return {
			message: "Failed to delete section",
			error: true,
		};
	}

	revalidatePath("/dashboard/menu");

	return {
		message: "Section successfully deleted",
		error: false,
	};
}

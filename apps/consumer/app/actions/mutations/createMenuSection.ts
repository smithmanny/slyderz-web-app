"use server";

import { generateId } from "lucia";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { db } from "drizzle";
import { sections } from "drizzle/schema/menu";

const createMenuSectionSchema = z.object({
	name: z.string().min(4),
});
export default async function createMenuSectionMutation(
	input: z.infer<typeof createMenuSectionSchema>,
) {
	const { chef } = await getChefSession();

	try {
		await db
			.insert(sections)
			.values({
				id: generateId(10),
				chefId: chef.id,
				name: input.name.toLowerCase(),
			})
			.onConflictDoUpdate({
				target: [sections.chefId, sections.name],
				set: {
					isActive: true,
				},
			});
	} catch (err: any) {
		// TODO: catch right error for duplicate section
		if (err.code === "P2002") {
			throw new Error("Section name must be unique");
		}

		throw new UnknownError({
			message: "Section not created",
			cause: err,
		});
	}
}

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import prisma from "db";

const createMenuSectionSchema = z.object({
	name: z.string().min(4),
});
export default async function createMenuSectionMutation(
	input: z.infer<typeof createMenuSectionSchema>,
) {
	const { chef } = await getChefSession();

	try {
		await prisma.section.upsert({
			where: {
				name_chefId: {
					name: input.name.toLowerCase(),
					chefId: chef.id,
				},
			},
			create: {
				name: input.name.toLowerCase(),
				chefId: chef.id,
			},
			update: {
				isActive: true,
			},
		});

		revalidatePath("/dashboard/menu");
	} catch (err: any) {
		if (err.code === "P2002") {
			throw new Error("Section name must be unique");
		}

		throw new UnknownError({
			message: "Section not created",
			cause: err,
		});
	}
}

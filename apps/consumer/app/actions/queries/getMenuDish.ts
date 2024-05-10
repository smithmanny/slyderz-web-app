"use server";

import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { db } from "drizzle";

const schema = z.object({
	dishId: z.string(),
});

export default async function getMenuDishQuery(input: z.infer<typeof schema>) {
	const { chef } = await getChefSession();
	const validatedFields = schema.parse(input);

	return await db.query.dishes.findFirst({
		where: (dishes, { eq }) => eq(dishes.id, validatedFields.dishId),
		with: {
			section: {
				columns: {
					name: true,
					id: true,
				},
			},
		},
	});
}

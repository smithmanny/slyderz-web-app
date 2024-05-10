"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { uploadS3Image } from "app/lib/utils";
import { db } from "drizzle";
import { dishes } from "drizzle/schema/menu";

const schema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.string(),
	image: z.any(),
	sectionId: z.string(),
	dishId: z.string(),
});
export async function updateDishMutation(input: FormData) {
	const { chef } = await getChefSession();

	const verifiedInputs = schema.parse(Object.fromEntries(input.entries()));

	try {
		const imageUrl = await uploadS3Image({
			userId: chef.userId,
			file: verifiedInputs.image,
		});

		await db
			.update(dishes)
			.set({
				description: verifiedInputs.description,
				name: verifiedInputs.name,
				price: verifiedInputs.price,
				sectionId: verifiedInputs.sectionId,
				chefId: chef.id,
				imageUrl,
			})
			.where(eq(dishes.id, verifiedInputs.dishId));
	} catch (err) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}

	return {
		message: "Dish successfully updated",
	};
}

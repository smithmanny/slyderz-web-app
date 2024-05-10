"use server";

import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { requiredFormData } from "app/lib/utils";
import { uploadS3Image } from "app/lib/utils";
import { db } from "drizzle";
import { dishes } from "drizzle/schema/menu";

export async function createDishMutation(input: FormData) {
	const { chef } = await getChefSession();
	const { name, description, price, sectionId, image } = requiredFormData<{
		name: string;
		description: string;
		image: File;
		price: string;
		sectionId: string;
	}>(input);

	try {
		const imageUrl = await uploadS3Image({
			userId: chef.userId,
			file: image,
		});

		await db
			.insert(dishes)
			.values({
				id: generateId(10),
				description,
				name: name.toLowerCase(),
				price,
				sectionId,
				chefId: chef.id,
				imageUrl,
			})
			.onConflictDoUpdate({
				target: [dishes.chefId, dishes.name],
				set: {
					isActive: true,
					price,
					description,
					imageUrl,
					sectionId,
				},
			});
	} catch (err) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}

	revalidatePath("/dashboard/menu");

	return {
		message: "Dish successfully created",
	};
}

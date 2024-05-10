"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";
import { deleteS3Image } from "app/lib/utils";
import { db } from "drizzle";
import { dishes } from "drizzle/schema/menu";

const deleteDishSchema = z.object({
	dishId: z.string(),
});
type Schema = z.infer<typeof deleteDishSchema>;
export async function deleteDishMutation(input: Schema) {
	const { chef } = await getChefSession();
	const { dishId } = deleteDishSchema.parse(input);

	const existingDish = await db.query.dishes.findFirst({
		where: (dishes, { eq }) => eq(dishes.id, dishId),
		columns: {
			imageUrl: true,
		},
	});

	if (!existingDish) {
		throw new NotFoundError({
			message: "Dish not found",
		});
	}

	const imageArr = existingDish.imageUrl.split("/");
	const dishImageUrl = imageArr.at(-1);

	if (!dishImageUrl) {
		throw new Error("Failed to get image url");
	}

	await db.transaction(async (tx) => {
		try {
			await deleteS3Image({
				userId: chef.userId,
				url: dishImageUrl,
			});

			await tx
				.update(dishes)
				.set({
					isActive: false,
					imageUrl: "",
				})
				.where(eq(dishes.id, dishId));
		} catch (err) {
			tx.rollback();
		}
	});

	revalidatePath("/dashboard/menu");

	return {
		message: "Dish successfully deleted",
	};
}

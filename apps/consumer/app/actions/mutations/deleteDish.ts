"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { z } from "zod"

import { getChefSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";
import { db } from "drizzle";
import { dishes } from "drizzle/schema/menu";

const S3 = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_URL,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
		secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
	},
});

const deleteDishSchema = z.object({
	dishId: z.string()
})
type Schema = z.infer<typeof deleteDishSchema>
export async function deleteDishMutation(input: Schema) {
	const { chef } = await getChefSession();
	const { dishId } = deleteDishSchema.parse(input);

	const existingDish = await db.query.dishes.findFirst({
		where: (dishes, { eq }) => eq(dishes.id, dishId),
		columns: {
			imageUrl: true
		}
	});

	if (!existingDish) {
		throw new NotFoundError({
			message: "Dish not found"
		})
	}

	const dishImageUrl = existingDish.imageUrl.split("dishes/")[1]

	await db.transaction(async (tx) => {
		try {
			await tx
				.update(dishes)
				.set({
					imageUrl: "",
				})
				.where(eq(dishes.id, dishId))
		} catch (err) {
			tx.rollback()
		}

		// Remove image from bucket
		const command = new DeleteObjectCommand({
				Bucket: "web-app",
				Key: `users/${chef.userId}/dishes/${dishImageUrl}`,
			});

		S3.send(command);
	})

	return {
		message: "Dish successfully deleted",
	};
}

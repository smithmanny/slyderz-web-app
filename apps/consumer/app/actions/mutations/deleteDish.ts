"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { requiredFormData } from "app/lib/utils";
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

// TODO: finish fixing image
export async function deleteDishMutation(input: FormData) {
	const { chef } = await getChefSession();
	const { dishId } = requiredFormData<{
		dishId: string;
	}>(input);

	const existingDish = await db.query.dishes.findFirst({
		where: (dishes, { eq }) => eq(dishes.id, dishId),
	});

	console.log(existingDish);

	// try {
	// 	const command = new DeleteObjectCommand({
	// 		Bucket: "web-app",
	// 		Key: `users/${chef.userId}/dishes/${image.name}`,
	// 	});

	// 	S3.send(command);

	// 	await db
	// 		.update(dishes)
	// 		.set({
	// 			imageUrl: "",
	// 		})
	// 		.where()
	// } catch (err) {
	// 	throw new UnknownError({
	// 		message: "Unknow error uploading image",
	// 		cause: err,
	// 	});
	// }

	// revalidatePath("/dashboard/menu");

	// return {
	// 	message: "Dish successfully deleted",
	// };
}

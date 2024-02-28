"use server";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getImageUrl } from "app/lib/utils";
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
	const { chef, session } = await getChefSession();
	const { name, description, price, sectionId, image } = requiredFormData<{
		name: string;
		description: string;
		image: Blob;
		price: string;
		sectionId: string;
	}>(input);
	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	let imageUrl = "";

	try {
		const command = new DeleteObjectCommand({
			Bucket: "web-app",
			Key: `users/${chef.userId}/dishes/${image.name}`,
		});

		S3.send(command);

		imageUrl = getImageUrl({
			userId: chef.userId,
			fileName: image.name,
			category: "dishes",
		});

		await db
			.insert(dishes)
			.values({
				id: generateId(10),
				description,
				name,
				price,
				sectionId,
				chefId: chef.id,
				imageUrl,
			})
			.onConflictDoUpdate({
				target: [dishes.chefId, dishes.name],
				set: {
					description,
					price,
					sectionId,
					imageUrl,
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
		message: "Dish successfully deleted",
	};
}

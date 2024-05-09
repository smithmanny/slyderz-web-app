"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { generateId } from "lucia";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { requiredFormData } from "app/lib/utils";
import { uploadS3Image } from "app/lib/utils";
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
				name,
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

	return {
		message: "Dish successfully created",
	};
}

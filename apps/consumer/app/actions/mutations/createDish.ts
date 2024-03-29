"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getImageUrl } from "app/lib/utils";
import { requiredFormData } from "app/lib/utils";
import prisma from "db";
import { Prisma } from ".prisma/client";

const S3 = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_URL,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
		secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
	},
});

export async function createDishMutation(input: FormData) {
	const { chef, session } = await getChefSession();
	const { name, description, price, sectionId, image } = requiredFormData<{
		name: string;
		description: string;
		image: Blob;
		price: number;
		sectionId: string;
	}>(input);
	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	let imageUrl = "";

	try {
		const command = new PutObjectCommand({
			Bucket: "web-app",
			Key: `users/${session.user.userId}/dishes/${image.name}`,
			Body: buffer,
		});

		S3.send(command);

		imageUrl = getImageUrl({
			userId: session.user.userId,
			fileName: image.name,
			category: "dishes",
		});
	} catch (err) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}

	const dish = await prisma.dish.upsert({
		where: {
			name_chefId: {
				name,
				chefId: chef.id,
			},
		},
		create: {
			description,
			name,
			price: new Prisma.Decimal(price),
			sectionId,
			chefId: chef.id,
			image: {
				create: {
					imageUrl,
				},
			},
		},
		update: {
			description,
			name,
			price: new Prisma.Decimal(price),
			sectionId,
			deleted: false,
			image: {
				create: {
					imageUrl,
				},
			},
		},
	});

	revalidatePath("/dashboard/menu");

	return dish;
}

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { getProtectedSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getImageUrl } from "app/lib/utils";
import prisma from "db";

const S3 = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_URL,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
		secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
	},
});

export async function PUT(request: Request) {
	const session = await getProtectedSession();
	const formData = await request.formData();
	const file = formData.get("file") as unknown as File;

	if (!file) {
		throw new Error("No file uploaded");
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	try {
		const command = new PutObjectCommand({
			Bucket: "web-app",
			Key: `users/${session.user.userId}/${file.name}`,
			Body: buffer,
		});

		S3.send(command);

		const imageUrl = getImageUrl({
			userId: session.user.userId,
			fileName: file.name,
		});

		await prisma.userPhoto.upsert({
			where: {
				userId: session.user.userId,
			},
			update: {
				imageUrl
			},
			create: {
				imageUrl,
				userId: session.user.userId
			},
		});

		return Response.json({ imageUrl });
	} catch (err) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}
}

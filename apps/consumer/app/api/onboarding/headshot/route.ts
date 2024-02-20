import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";

import { getProtectedSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { getImageUrl } from "app/lib/utils";
import { db } from "drizzle";
import { users } from "drizzle/schema/user";

const S3 = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_URL,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || "",
		secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
	},
});

export async function PUT(request: Request) {
	const { user } = await getProtectedSession();
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
			Key: `users/${user.id}/${file.name}`,
			Body: buffer,
		});

		S3.send(command);

		const imageUrl = getImageUrl({
			userId: user.id,
			fileName: file.name,
		});

		await db
			.update(users)
			.set({
				headshotUrl: imageUrl
			})
			.where(eq(users.id, user.id))

		return Response.json({ imageUrl });
	} catch (err) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}
}

export async function GET() {
	const { user } = await getProtectedSession();
	const profilePic = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, user.id),
	});

	return Response.json({ imageUrl: profilePic?.headshotUrl });
}
